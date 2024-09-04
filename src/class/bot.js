/** @import {BotData, BotCommand, BotOptions, SuccessRecord, BotEvent, ClientEvent, ClientEventFunction, RepeatingEvent, RepeatingEventFunction, FailRecord} from '../options.js' */
import { findPaths, storeFolderPaths, readFolderPaths } from '@disqada/pathfinder'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import { setTimeout } from 'timers/promises'
import { resolve, sep } from 'path'
import { interactionCreate } from '../events/interactionCreate.js'
import { validCommand, validEvent } from '../func/validate.js'
import { logSuccesses, logFails } from '../func/log.js'
import { toNumber } from '../func/time.js'
import { ready } from '../events/ready.js'
import { readFile } from 'fs/promises'

/**
 * The Bot class.
 * @class
 * @extends {Client<true>}
 */
export class Bot extends Client {
  /**
   * The data collected from the data files in the data folder.
   * @type {BotData}
   */
  data = {
    config: { presence: { status: 'online' } },
    id: {
      role: {},
      user: {},
      guild: {},
      channel: {}
    },
    brand: {
      name: 'Bot',
      color: 0xffffff,
      logoUrl: 'https://cdn.discordapp.com/embed/avatars/0.png'
    }
  }

  /**
   * The commands of the bot.
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

    if (!options.token) throw new Error('No token was provided')
    this.run(options)
  }

  /**
   * Start and connect the bot.
   * @param {BotOptions} options - Information about the Bot.
   * @returns {Promise<void>}
   * @private
   */
  async run({ directories, token }) {
    const folders = Object.assign({ root: 'bot', data: 'data' }, directories)
    await Promise.all([storeFolderPaths([folders.root], { deepSearch: true }), this.storeData(folders.data)])

    await this.registerAllModules()
    this.listenToEvents()

    await this.login(token)
  }

  /**
   * Inject data from the workspace files.
   * @param {string} folder - The path to the directory the json data files.
   * @returns {Promise<void>}
   */
  async storeData(folder) {
    const files = await readFolderPaths(resolve(folder), { deepSearch: false })
    if (files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      const i1 = files[i].lastIndexOf(sep)
      const i2 = files[i].length - 5 // '.json'.length
      const name = files[i].substring(i1 + sep.length, i2)

      const data = JSON.parse(await readFile(files[i], 'utf-8'))
      if (data) {
        if (typeof this.data[name] === 'object') Object.assign(this.data[name], data)
        else this.data[name] = data
      }
    }
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
   * Register bot modules to the bot.
   * @returns {Promise<void>}
   * @private
   */
  async registerAllModules() {
    const paths = findPaths()
      .filter(({ fullPath }) => fullPath.includes('command') || fullPath.includes('event'))
      .map(({ fullPath }) => fullPath)
    if (paths.length === 0) return

    /** @type {SuccessRecord[]} */
    const sRecords = []
    /** @type {FailRecord[]} */
    const fRecords = []

    for (let i = 0; i < paths.length; i++) {
      let botModule

      try {
        botModule = (await import(paths[i])).default
      } catch (err) {
        if (err.code === 'ERR_MODULE_NOT_FOUND') continue
        if (err.code === 'ERR_UNSUPPORTED_ESM_URL_SCHEME') {
          botModule = (await import('file://' + paths[i])).default
        } else throw err
      }

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
      const i2 = paths[i].indexOf(word)
      fRecords.push({
        path: paths[i].substring(i2 + word.length + 1),
        message: 'The module is invalid, maybe a required property is missing'
      })
    }

    if (sRecords.length > 0) console.log(logSuccesses(sRecords))
    if (fRecords.length > 0) console.log(logFails(fRecords))
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
      deployment: command.data.deployment || 'global'
    }
  }

  /**
   * Register an event inside the bot.
   * @param {BotEvent} event - The bot event module.
   * @returns {SuccessRecord}
   */
  registerEvent({ data, execute }) {
    /** @type {SuccessRecord} */
    const record = {
      name: '',
      type: data.module,
      deployment: 'global'
    }

    if (data.module === 'event') {
      /** @type {ClientEventFunction<any>} */
      const func = (args) => execute(this, args)

      if (data.name === Events.ClientReady || data.once) this.once(data.name, func)
      else this.on(data.name, func)

      record.name = data.name
    } else if (data.module === 'event-repeat') {
      /** @type {RepeatingEventFunction} */
      const func = async () => {
        let first = true
        let nextWait

        if (data.firstWait) nextWait = toNumber(data.firstWait)
        else {
          nextWait = toNumber(data.wait)
          first = false
        }

        while (true) {
          await setTimeout(nextWait)
          const value = await execute(this)

          if (typeof value === 'number' || typeof value === 'string') nextWait = toNumber(value)
          else if (first) {
            nextWait = toNumber(data.wait)
            first = false
          }

          if (nextWait === 0) break
        }
      }

      // @ts-ignore
      this.once(Events.ClientReady, func)

      record.name = 'repeating'
    }

    return record
  }
}
