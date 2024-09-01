/** @import {BotData, BotCommand, BotOptions, SuccessRecord, BotEvent, ClientEvent, ClientEventFunction, RepeatingEvent, RepeatingEventFunction, FailRecord} from '../options.js' */
import { findPaths, storeFolderPaths, readFolderPaths } from '@disqada/pathfinder'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { setTimeout } from 'timers/promises'
import { resolve, sep } from 'path'
import { interactionCreate } from '../events/interactionCreate.js'
import { logSuccessRecords, logFailRecords } from '../func/log.js'
import { validCommand, validEvent } from '../func/validate.js'
import { toNumber } from '../func/time.js'
import { ready } from '../events/ready.js'

/**
 * @class
 */
export class DiscordBot extends Client {
  /**
   * @type {BotData}
   */
  data = {
    config: {
      id: {
        guild: {}
      },
      brand: {
        name: 'HalfBot',
        colour: 0xffffff,
        logoUrl: 'https://cdn.discordapp.com/embed/avatars/0.png'
      },
      presence: {
        status: 'online'
      }
    }
  }

  /**
   * @type {Map<string, BotCommand>}
   */
  commands = new Map()

  /**
   * Will be deleted in the next major release
   * @type {Client}
   * @deprecated The bot class now extends `Client`, use it instead
   */
  client

  /**
   * The initialization of a new DiscordBot.
   * @param {BotOptions} options - Information about the DiscordBot.
   */
  constructor(options) {
    super(
      options.client || {
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]
      }
    )

    this.client = this
    this.runBot(options)
  }

  /**
   * Start and connect the bot.
   * @param {BotOptions} options - Information about the DiscordBot.
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
      this.storeData(options.directories.data || 'bot/data')
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

      const data = require(files[i])
      if (data) {
        if (name === 'config') Object.assign(this.data.config, data)
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
    const successRecords = []
    /** @type {FailRecord[]} */
    const failRecords = []

    for (let i = 0; i < paths.length; i++) {
      const botModule = require(paths[i])

      if (validCommand(botModule)) {
        const record = this.registerCommand(botModule)
        successRecords.push(record)
        continue
      } else if (validEvent(botModule)) {
        const record = this.registerEvent(botModule)
        successRecords.push(record)
        continue
      }

      const word = 'modules'
      const index = paths[i].indexOf(word)
      failRecords.push({
        path: paths[i].substring(index + word.length + 1),
        message: 'The module is invalid, maybe a required property is missing'
      })
    }

    console.log(logSuccessRecords(successRecords))
    console.log(logFailRecords(failRecords))
  }
}
