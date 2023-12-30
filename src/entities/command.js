/**
 * The full object of a command file
 * @typedef {object} BotCommand
 * @property {CommandData} data
 * @property {CommandFunction} execute
 */

/**
 * @typedef {BaseCommandData & (import("discord.js").ChatInputApplicationCommandData | import("discord.js").UserApplicationCommandData | import("discord.js").MessageApplicationCommandData)} CommandData
 */

/**
 * @typedef {object} BaseCommandData
 * @property {string} category
 * @property {import("../def/enums").DeploymentType} [deployment]
 * @property {"command"} module Bot module type
 */

/**
 * @typedef {BaseCommandInteraction & (import("discord.js").ChatInputCommandInteraction | import("discord.js").UserContextMenuCommandInteraction | import("discord.js").MessageContextMenuCommandInteraction)} CommandInteraction
 */

/**
 * @typedef {object} BaseCommandInteraction
 * @property {import("../core/discordBot").DiscordBot} bot
 */

/**
 * @callback CommandFunction
 * @param {CommandInteraction} interaction
 * @returns {Promise<import("discord.js").ReplyOptions | string | void> | import("discord.js").ReplyOptions| string | void}
 */

module.exports = {};
