/**
 * Get the correct server ID.
 * @param {import('../options').CommandData} data - The command data deciding where to register the command.
 * @param {import('../options').GuildIDs} guildIds - The container of the server IDs.
 * @returns {string} The server ID.
 * @throws {Error} - if data.deployment wasn't of the enum values.
 * @private
 */
function getGuildId(data, guildIds) {
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
 * @param {import('../class/discordBot').DiscordBot} bot - The bot to register the commands for.
 * @returns {Map<string, import('../options').CommandData[]>}
 * @private
 */
function prepareCommands(bot) {
  const commands = new Map()

  for (const iterator of bot.commands) {
    const command = iterator[1]
    const guildId = getGuildId(command.data, bot.data.config.id.guild)

    const commandArray = commands.get(guildId) ?? []
    commandArray.push(command.data)
    commands.set(guildId, commandArray)
  }

  return commands
}

/**
 * Register the commands via the API.
 * @param {import('../class/discordBot').DiscordBot} bot - The bot to register the commands for.
 * @param {Map<string, import('../options').CommandData[]>} commandMap - The commands to register.
 * @returns {Promise<void>}
 * @private
 */
async function registerCommands(bot, commandMap) {
  for (const iterator of commandMap) {
    const commandsData = iterator[1]
    const guildId = iterator[0]

    if (guildId === '0') {
      await bot.application?.commands.set(commandsData)
    } else {
      await bot.application?.commands.set(commandsData, guildId)
    }
  }
}

/**
 * The bot is ready and has connected successfully.
 * @param {import('../class/discordBot').DiscordBot} bot - The bot.
 * @returns {Promise<void>}
 * @async
 * @private
 */
async function ready(bot) {
  const commands = prepareCommands(bot)
  await registerCommands(bot, commands)

  if (bot.user) {
    console.log(`-> The Bot '${bot.user.username}' Is Online <-`)
    bot.user.setPresence(bot.data.config.presence)
  } else {
    console.log('-> Bot Is Online <-')
  }
}

module.exports = {
  ready,
  getGuildId,
  prepareCommands
}
