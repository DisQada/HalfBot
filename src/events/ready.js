/**
 * @file
 * @ignore
 */

const { ActivityType, Collection } = require("discord.js");
const { BotCommandDeployment } = require("../entities/command");

/**
 * Get the correct server ID.
 * @param {BotCommandData} data - The command data deciding where to register the command.
 * @param {BotConfig} guildIds - The container of the server IDs.
 * @returns {string} The server ID.
 * @private
 * @throws {Error} - if data.deployment wasn't of the enum values.
 */
function getGuildId(data, guildIds) {
    const globalGuildId = "0";

    switch (data.deployment) {
        case BotCommandDeployment.Global:
            return globalGuildId;

        case BotCommandDeployment.DevGuild:
            return guildIds.dev ?? globalGuildId;

        case BotCommandDeployment.SupportGuild:
            return guildIds.support ?? globalGuildId;

        default:
            throw new Error(
                "Unknown BotCommandDeployment value: " + data.deployment
            );
    }
}

/**
 * Register the commands via the API.
 * @param {Client} client - The client to register the commands for.
 * @param {Collection<BotCommand>} commandCollection - The commands to register.
 * @returns {Promise<undefined>}
 * @private
 */
async function finalRegistration(client, commandCollection) {
    for (const iterator of commandCollection) {
        const guildId = iterator[0];
        const commandsData = iterator[1];

        if (guildId === "0") {
            await client.application?.commands.set(commandsData);
        } else {
            await client.guilds.cache.get(guildId)?.commands.set(commandsData);
        }
    }
}

/**
 * The initial step for registering the bot commands.
 * @param {DiscordBot} bot - The bot to register the commands for.
 * @returns {undefined}
 * @private
 */
function registerCommands(bot) {
    const commands = new Collection();

    for (const iterator of bot.commands) {
        const command = iterator[1];
        const guildId = getGuildId(command.data, bot.data.config.id.guild);

        const commandArray = commands.get(guildId) ?? [];
        commandArray.push(command.data);
        commands.set(guildId, commandArray);
    }

    finalRegistration(bot.client, commands);
}

/**
 * The client is ready and has connected successfully.
 * @param {DiscordBot} bot - The bot of the client.
 * @returns {undefined}
 * @private
 */
function ready(bot) {
    registerCommands(bot);

    console.log(`The bot "${bot.client.user.username}" is online`);

    bot.client.user.setPresence({
        status: "online",
        activities: [
            {
                name: "Operating ⚙ ...",
                type: ActivityType.Listening,
                url: "https://github.com/DisQada/halfbot"
            }
        ]
    });
}

module.exports = ready;
