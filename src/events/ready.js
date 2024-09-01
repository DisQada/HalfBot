/** @import {CommandData, GuildIDs} from '../options.js' */
/** @import {DiscordBot} from '../class/discordBot.js' */

/**
 * Get the correct server ID.
 * @param {CommandData} data - The command data deciding where to register the command.
 * @param {GuildIDs} guildIds - The container of the server IDs.
 * @returns {string} The server ID.
 * @throws {Error} - if data.deployment wasn't of the enum values.
 * @private
 */
export function getGuildId(data, guildIds) {
  const globalGuildId = '0'

  switch (data.deployment) {
    case 'dev':
      return guildIds.dev ?? globalGuildId

    case 'support':
      return guildIds.support ?? globalGuildId

    case 'global':
    default:
      return globalGuildId
  }
}

/**
 * Preparing the bot commands for registration.
 * @param {DiscordBot} bot - The bot to register the commands for.
 * @returns {Map<string, CommandData[]>}
 * @private
 */
export function prepareCommands(bot) {
  const commands = new Map()

  for (const [_, command] of bot.commands) {
    const guildId = getGuildId(command.data, bot.data.config.id.guild)

    const commandArray = commands.get(guildId) ?? []
    commandArray.push(command.data)
    commands.set(guildId, commandArray)
  }

  return commands
}

/**
 * Register the commands via the API.
 * @param {DiscordBot} bot - The bot to register the commands for.
 * @param {Map<string, CommandData[]>} commandMap - The commands to register.
 * @returns {Promise<void>}
 * @private
 */
async function registerCommands(bot, commandMap) {
  for (const [guildId, commandsData] of commandMap) {
    if (guildId === '0') await bot.application?.commands.set(commandsData)
    else await bot.application?.commands.set(commandsData, guildId)
  }
}

/**
 * The bot is ready and has connected successfully.
 * @param {DiscordBot} bot - The bot.
 * @returns {Promise<void>}
 * @async
 * @private
 */
export async function ready(bot) {
  const commands = prepareCommands(bot)
  await registerCommands(bot, commands)

  if (bot.user) {
    console.log(`-> The Bot '${bot.user.username}' Is Online <-`)
    // @ts-expect-error
    bot.user.setPresence(bot.data.config.presence)
  } else console.log('-> Bot Is Online <-')
}
