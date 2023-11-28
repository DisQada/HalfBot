/**
 * @typedef {BaseCommandData & (import("discord.js").ChatInputApplicationCommandData | import("discord.js").UserApplicationCommandData | import("discord.js").MessageApplicationCommandData)} CommandData
 */

/**
 * @typedef {object} BaseCommandData
 * @property {string} category
 * @property {import("../interface/types").DeploymentType} [deployment]
 * @property {"command"} module Bot module type
 */

/**
 * @typedef {BaseCommandInteraction & (import("discord.js").ChatInputCommandInteraction | import("discord.js").UserContextMenuCommandInteraction | import("discord.js").MessageContextMenuCommandInteraction)} CommandInteraction
 */

/**
 * @enum {number}
 * @property {0} Global Global registration.
 * @property {1} DevGuild Testing server only registration.
 * @property {2} SupportGuild Support / main server registration.
 */
const BotCommandDeployment = Object.freeze({
    Global: 0,
    DevGuild: 1,
    SupportGuild: 2,
    [0]: "Global",
    [1]: "DevGuild",
    [2]: "SupportGuild"
});

/**
 * @enum {number}
 * @property {0} User User context menu.
 * @property {1} Message Message context menu.
 */
const BotCommandContextMenuType = Object.freeze({
    User: 0,
    Message: 1
});

/**
 * @typedef {object} BaseCommandInteraction
 * @prop {import("../core/discordBot").DiscordBot} bot
 */

/**
 * @callback CommandFunction
 * @param {CommandInteraction} interaction
 * @returns {Promise<import("discord.js").ReplyOptions | string | void> | import("discord.js").ReplyOptions| string | void}
 */

/**
 * @class
 * @category Modules
 */
class BotCommand {
    /**
     * @type {CommandData}
     */
    data;

    /**
     * @type {CommandFunction}
     */
    execute;

    /**
     * The initialization of a new bot command.
     * @param {CommandData} data - The information about the command.
     * @param {CommandFunction} execute - The function to execute the command.
     */
    constructor(data, execute) {
        this.data = data;
        this.execute = execute;
    }

    /**
     * Check a command validity.
     * @param {BotCommand} command - The command to check.
     * @returns {boolean} True if valid, false otherwise.
     */
    static isValid(command) {
        if (!command.data || !command.execute) {
            return false;
        }

        const required = ["name", "description"];
        const hasRequiredData = required.every(
            (property) => property in command.data
        );

        return hasRequiredData;
    }
}

module.exports = {
    BotCommand,
    BotCommandDeployment,
    BotCommandContextMenuType
};
