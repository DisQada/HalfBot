/**
 * Get the correct server ID.
 * @param {BotCommandData} data - The command data deciding where to register the command.
 * @param {import("../def/config").GuildIDs} guildIds - The container of the server IDs.
 * @returns {string} The server ID.
 * @throws {Error} - if data.deployment wasn't of the enum values.
 * @category Events
 * @private
 */
function getGuildId(data, guildIds) {
    const globalGuildId = "0";

    switch (data.deployment) {
        case "dev":
            return guildIds.dev ?? globalGuildId;

        case "support":
            return guildIds.support ?? globalGuildId;

        case "global":
        default:
            return globalGuildId;
    }
}

/**
 * Preparing the bot commands for registration.
 * @param {import("../core/discordBot").DiscordBot} bot - The bot to register the commands for.
 * @returns {Map<string, import("../entities/command").BotCommand[]>}
 * @category Events
 * @private
 */
function prepareCommands(bot) {
    const commands = new Map();

    for (const iterator of bot.commands) {
        const command = iterator[1];
        const guildId = getGuildId(command.data, bot.data.config.id.guild);

        const commandArray = commands.get(guildId) ?? [];
        commandArray.push(command.data);
        commands.set(guildId, commandArray);
    }

    return commands;
}

/**
 * Register the commands via the API.
 * @param {import("discord.js").Client} client - The client to register the commands for.
 * @param {Map<string, import("../entities/command").BotCommand>} commandMap - The commands to register.
 * @returns {Promise<void>}
 * @category Events
 * @private
 */
async function registerCommands(client, commandMap) {
    for (const iterator of commandMap) {
        const commandsData = iterator[1];
        const guildId = iterator[0];

        if (guildId === "0") {
            await client.application?.commands.set(commandsData);
        } else {
            await client.guilds.cache.get(guildId)?.commands.set(commandsData);
        }
    }
}

/**
 * The client is ready and has connected successfully.
 * @param {import("../core/discordBot").DiscordBot} bot - The bot of the client.
 * @returns {Promise<void>}
 * @category Events
 * @async
 * @private
 */
async function ready(bot) {
    const commands = prepareCommands(bot);
    await registerCommands(bot.client, commands);

    console.log(`-> The bot "${bot.client.user.username}" is online <-`);
    bot.client.user.setPresence(bot.data.config.presence);
}

module.exports = {
    ready,
    getGuildId,
    prepareCommands
};
