// eslint-disable-next-line no-unused-vars
const BotCommandDeployment = Object.freeze({
    Global: "Global",
    DevGuild: "DevGuild",
    SupportGuild: "SupportGuild"
});

// eslint-disable-next-line no-unused-vars
const BotCommandContextMenuType = Object.freeze({
    User: "User",
    Message: "Message"
});

/**
 * @typedef {Object} BotCommandData
 * @property {string} description
 * @property {BotCommandDeployment} deployment
 * @property {string} category
 * @property {Object} types
 * @property {boolean} types.chatInput
 * @property {BotCommandContextMenuType} [types.contextMenu]
 * @extends {ChatInputApplicationCommandData | UserApplicationCommandData | MessageApplicationCommandData}
 */

/**
 * @typedef {Object} BotCommandInteraction
 * @property {DiscordBot} bot
 * @extends {ChatInputCommandInteraction | UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction}
 */

/**
 * @async
 * @callback BotCommandFunction
 * @param {BotCommandInteraction} interaction
 * @returns {Promise<InteractionReplyOptions | string | void>}
 */

class BotCommand {
    data;
    execute;

    constructor(data, execute) {
        this.data = data;
        this.execute = execute;
    }

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
