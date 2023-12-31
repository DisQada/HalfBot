const { Client, Events, GatewayIntentBits } = require('discord.js')
const { interactionCreate } = require('../events/interactionCreate')
const { ready } = require('../events/ready')
const { logSuccessRecords, logFailRecords } = require('../func/log')
const {
  findPaths,
  storeFolderPaths,
  readFolderPaths
} = require('@disqada/pathfinder')
const { resolve, sep } = require('path')
const { validCommand, validEvent } = require('../func/validate')

/**
 * @class
 * @category Core
 */
class DiscordBot {
  /**
   * @type {import('../options').BotData}
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
   * @type {Map<string, import('../options').BotCommand>}
   */
  commands = new Map()

  /**
   * @type {import('discord.js').Client}
   */
  client

  /**
   * The initialization of a new DiscordBot.
   * @param {import('../options').BotOptions} options - Information about the DiscordBot.
   */
  constructor(options) {
    /** @type {Partial<import('../options').BotOptions>} */
    const defaultOptions = {
      client: {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.GuildMembers
        ]
      },
      directories: {
        root: 'bot',
        data: 'bot/data'
      }
    }
    Object.assign(defaultOptions, options)

    // TODO Check token and clientId validity
    this.client = new Client(options.client)
    this.runBot(options)
  }

  /**
   * Start and connect the bot.
   * @param {import('../options').BotOptions} options - Information about the DiscordBot.
   * @returns {Promise<void>}
   * @async
   * @private
   */
  async runBot(options) {
    // @ts-ignore
    await storeFolderPaths([options.directories.root], {
      deepSearch: true
    })
    // @ts-ignore
    await this.storeData(options.directories.data)
    await this.registerAllModules()
    this.listenToEvents()

    await this.client.login(options.token)
  }

  /**
   * Subscribe to the core events.
   * @returns {void}
   * @private
   */
  listenToEvents() {
    this.client.on(Events.ClientReady, () => ready(this))
    this.client.on(Events.InteractionCreate, (interaction) => {
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
    const files = await readFolderPaths(resolve(directory), {
      deepSearch: false
    })
    for (let i = 0; i < files.length; i++) {
      const index1 = files[i].lastIndexOf(sep)
      const index2 = files[i].length - '.json'.length
      const name = files[i].substring(index1 + sep.length, index2)

      const data = require(files[i])
      if (data) {
        if (name === 'config') {
          Object.assign(this.data.config, data)
        } else {
          this.data[name] = data
        }
      }
    }
  }

  /**
   * Register a command inside the bot.
   * @param {import('../options').BotCommand} command - The bot command module.
   * @returns {import('../options').SuccessRecord}
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
   * @param {import('../options').BotEvent<any>} event - The bot event module.
   * @returns {import('../options').SuccessRecord}
   */
  registerEvent(event) {
    this.client.on(event.data.name, (...args) => event.execute(this, [...args]))

    return {
      name: event.data.name,
      type: event.data.module,
      deployment: 'global'
    }
  }

  /**
   * Register bot modules to the client.
   * @returns {Promise<void>}
   * @async
   * @private
   */
  async registerAllModules() {
    const paths = findPaths({})
      .filter(
        (fp) => fp.fullPath.includes('command') || fp.fullPath.includes('event')
      )
      .map((fp) => fp.fullPath)
    if (paths.length === 0) {
      return
    }

    /** @type {import('../options').SuccessRecord[]} */
    const successRecords = []
    /** @type {import('../options').FailRecord[]} */
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

module.exports = {
  DiscordBot
}
