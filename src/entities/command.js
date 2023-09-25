/* eslint-disable jsdoc/require-example */

/**
 * @module Command
 * @memberof Entities
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
    SupportGuild: 2
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
 * @typedef {object} BotCommandData
 * @property {string} description About the command.
 * @property {BotCommandDeployment} deployment Where to register the command.
 * @property {string} category The category of the command.
 * @property {object} types The type of the command.
 * @property {boolean} types.chatInput Whether the command is of type (chat input).
 * @property {BotCommandContextMenuType} [types.contextMenu] What type of context menu the command is.
 * @augments ChatInputApplicationCommandData | UserApplicationCommandData | MessageApplicationCommandData
 */

/**
 * @typedef {object} BotCommandInteraction
 * @property {DiscordBot} bot The entire bot instance.
 * @augments ChatInputCommandInteraction | UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction
 */

/**
 * @async
 * @function
 * @callback BotCommandFunction
 * @param {BotCommandInteraction} interaction
 * @returns {Promise<InteractionReplyOptions | string | undefined>}
 */

/**
 * @class
 */
class BotCommand {
    /**
     * @type {BotCommandData}
     */
    data;

    /**
     * @type {BotCommandFunction}
     */
    execute;

    /**
     * The initialization of a new bot command.
     * @param {BotCommandData} data - The information about the command.
     * @param {BotCommandFunction} execute - The function to execute the command.
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

        const required = [
            "name",
            "description",
            "deployment",
            "category",
            "types"
        ];
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
