/** @import {BotData, BotCommand, BotOptions, SuccessRecord, BotEvent, ClientEvent, ClientEventFunction, RepeatingEvent, RepeatingEventFunction, FailRecord} from '../options.js' */
import { findPaths, storeFolderPaths, readFolderPaths } from '@disqada/pathfinder'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { setTimeout } from 'timers/promises'
import { resolve, sep } from 'path'
import { interactionCreate } from '../events/interactionCreate.js'
import { logSuccesses, logFails } from '../func/log.js'
import { validCommand, validEvent } from '../func/validate.js'
import { toNumber } from '../func/time.js'
import { ready } from '../events/ready.js'

/**
 * @class
 */
export class Bot extends Client {
  /**
   * @type {BotData}
   */
  data = {
    config: {
      presence: {
        status: 'online'
      }
    },
      id: {
      role: {},
      user: {},
      guild: {},
      channel: {}
      },
      brand: {
      name: 'HalfBot',
      color: 0xffffff,
      logoUrl: 'https://cdn.discordapp.com/embed/avatars/0.png'
    }
  }

  /**
   * @type {Map<string, BotCommand>}
   */
  commands = new Map()

  /**
   * The initialization of a new Bot.
   * @param {BotOptions} options - Information about the Bot.
   */
  constructor(options) {
    super(
      options.client || {
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]
      }
    )

    this.runBot(options)
  }

  /**
   * Start and connect the bot.
   * @param {BotOptions} options - Information about the Bot.
   * @returns {Promise<void>}
   * @async
   * @private
   */
  async runBot(options) {
    if (!options.directories) {
      options.directories = {}
    }

    await Promise.all([
      storeFolderPaths([options.directories.root || 'bot'], {
        deepSearch: true
      }),
      this.storeData(options.directories.data || 'data')
    ])

    await this.registerAllModules()
    this.listenToEvents()

    if (!options.token) {
      throw new Error('No token was provided')
    }
    await this.login(options.token)
  }

  /**
   * Subscribe to the core events.
   * @returns {void}
   * @private
   */
  listenToEvents() {
    this.once(Events.ClientReady, () => ready(this))
    this.on(Events.InteractionCreate, (interaction) => {
      // @ts-expect-error
      interaction.bot = this
      // @ts-expect-error
      interactionCreate(interaction)
    })
  }

  /**
   * Inject data from the workspace files.
   * @param {string} directory - The path to the directory the json data files.
   * @returns {Promise<void>}
   * @async
   */
  async storeData(directory) {
    const files = await readFolderPaths(resolve(directory), { deepSearch: false })
    if (files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      const i1 = files[i].lastIndexOf(sep)
      const i2 = files[i].length - '.json'.length
      const name = files[i].substring(i1 + sep.length, i2)

      const data = (await import(files[i])).default
      if (data) {
        if (typeof this.data[name] === 'object') Object.assign(this.data[name], data)
        else this.data[name] = data
      }
    }
  }

  /**
   * Register a command inside the bot.
   * @param {BotCommand} command - The bot command module.
   * @returns {SuccessRecord}
   */
  registerCommand(command) {
    this.commands.set(command.data.name, command)

    return {
      name: command.data.name,
      type: command.data.module,
      deployment: command.data.deployment ?? 'global'
    }
  }

  /**
   * Register an event inside the bot.
   * @param {BotEvent} event - The bot event module.
   * @returns {SuccessRecord}
   */
  registerEvent(event) {
    /** @type {SuccessRecord} */
    const record = {
      name: '',
      type: event.data.module,
      deployment: 'global'
    }

    switch (event.data.module) {
      case 'event': {
        /** @type {ClientEvent<any>} */
        // @ts-expect-error
        const e = event
        const { data, execute } = e
        /** @type {ClientEventFunction<any>} */
        const func = (args) => execute(this, args)

        if (data.name === Events.ClientReady || data.once) this.once(data.name, func)
        else this.on(data.name, func)

        record.name = data.name
        break
      }

      case 'event-repeat': {
        /** @type {RepeatingEvent} */
        // @ts-expect-error
        const e = event
        const { data, execute } = e
        /** @type {RepeatingEventFunction} */
        const func = async () => {
          let first
          let nextWait

          if (data.firstWait) {
            nextWait = toNumber(data.firstWait)
            first = true
          } else {
            nextWait = toNumber(data.wait)
            first = false
          }

          // eslint-disable-next-line no-constant-condition
          while (true) {
            await setTimeout(nextWait, undefined)
            const value = await execute(this)

            if (typeof value === 'number' || typeof value === 'string') nextWait = toNumber(value)
            else if (first) {
              nextWait = toNumber(data.wait)
              first = false
            }

            if (nextWait === 0) break
          }
        }

        // @ts-expect-error
        this.once(Events.ClientReady, func)

        record.name = 'repeating'
        break
      }
    }

    return record
  }

  /**
   * Register bot modules to the bot.
   * @returns {Promise<void>}
   * @async
   * @private
   */
  async registerAllModules() {
    const paths = findPaths()
      .map((fp) => fp.fullPath)
      .filter((fp) => fp.includes('command') || fp.includes('event'))
    if (paths.length === 0) return

    /** @type {SuccessRecord[]} */
    const sRecords = []
    /** @type {FailRecord[]} */
    const fRecords = []

    for (let i = 0; i < paths.length; i++) {
      const botModule = (await import(paths[i])).default

      if (validCommand(botModule)) {
        const record = this.registerCommand(botModule)
        sRecords.push(record)
        continue
      } else if (validEvent(botModule)) {
        const record = this.registerEvent(botModule)
        sRecords.push(record)
        continue
      }

      const word = 'modules'
      const index = paths[i].indexOf(word)
      fRecords.push({
        path: paths[i].substring(index + word.length + 1),
        message: 'The module is invalid, maybe a required property is missing'
      })
    }

    if (sRecords.length > 0) console.log(logSuccesses(sRecords))
    if (fRecords.length > 0) console.log(logFails(fRecords))
  }
}
