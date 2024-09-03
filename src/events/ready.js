/** @import {CommandData, GuildIDs} from '../options.js' */
/** @import {Bot} from '../class/bot.js' */

/**
 * Get the correct server ID.
 * @param {CommandData} data - The command data deciding where to register the command.
 * @param {GuildIDs} guildIds - The container of the server IDs.
 * @returns {string} The server ID.
 * @throws {Error} - if data.deployment wasn't of the enum values.
 * @private
 */
export function getGuildId(data, guildIds) {
  const globalId = '0'

  if (data.deployment === 'dev') return guildIds.dev || globalId
  if (data.deployment === 'support') return guildIds.support || globalId

  return globalId
}

/**
 * Preparing the bot commands for registration.
 * @param {Bot} bot - The bot to register the commands for.
 * @returns {Map<string, CommandData[]>}
 * @private
 */
export function prepareCommands({ commands, data }) {
  const prepared = new Map()

  for (const [_, command] of commands) {
    const guildId = getGuildId(command.data, data.id.guild)

    const commandArr = prepared.get(guildId) ?? []
    commandArr.push(command.data)
    prepared.set(guildId, commandArr)
  }

  return prepared
}

/**
 * Register the commands via the API.
 * @param {Bot} bot - The bot to register the commands for.
 * @param {Map<string, CommandData[]>} commandMap - The commands to register.
 * @returns {Promise<void>}
 * @private
 */
async function registerCommands({ application }, commandMap) {
  for (const [guildId, commandsData] of commandMap) {
    if (guildId === '0') await application?.commands.set(commandsData)
    else await application?.commands.set(commandsData, guildId)
  }
}

/**
 * The bot is ready and has connected successfully.
 * @param {Bot} bot - The bot.
 * @returns {Promise<void>}
 * @async
 * @private
 */
export async function ready(bot) {
  await registerCommands(bot, prepareCommands(bot))

  const { user, data } = bot
  if (user) {
    console.log(`-> The Bot '${user.username}' Is Online <-`)
    // @ts-expect-error
    user.setPresence(data.config.presence)
  } else console.log('-> Bot Is Online <-')
}
