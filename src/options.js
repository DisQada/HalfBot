/**
 * @typedef {object} StyleOptions
 * @property {boolean} skipFooter
 */

// Enum

/**
 * Possible types for a bot module
 * @typedef {"command" | "event"} Modules
 */

/**
 * Deployment of a bot module
 * @typedef {"global" | "dev" | "support"} Deployments
 */

// Core

/**
 * @typedef {object} BotOptions
 * @property {string} token The bot application's API token.
 * @property {object} [directories]
 * @property {string} [directories.root] - The path to the folder containing all the bot files.
 * @property {string} [directories.data] - The Path to the directory the json data files.
 * @property {import("discord.js").ClientOptions} client
 */

/**
 * @typedef {object} BotData
 * @property {Config} config
 */

// Config

/**
 * @typedef {object} Config
 * @property {IDs} id - The container of all IDs.
 * @property {Brand} brand - The container of the bot's brand information.
 * @property {import("discord.js").PresenceData} presence
 */

/**
 * The container of all IDs
 * @typedef {object} Brand
 * @property {string} name
 * @property {number} colour hex colour
 * @property {string} logoUrl
 */

/**
 * The container of all IDs
 * @typedef {object} IDs
 * @property {GuildIDs} guild The IDs of all servers
 */

/**
 * The IDs of all servers
 * @typedef {object} GuildIDs
 * @property {string} [dev] The id of the development / testing server
 * @property {string} [support] The id of the support / main
 */

// Record

/**
 * @typedef {SuccessRecord | FailRecord} Record
 */

/**
 * @typedef {object} SuccessRecord
 * @property {string} name Name of the module
 * @property {Modules} type Bot module type
 * @property {Deployments} deployment The servers deployed to
 * @private
 */

/**
 * @typedef {object} FailRecord
 * @property {string} path Path of the file failed to be registered
 * @property {string} message Information about the failure
 * @private
 */

// Command

/**
 * The full object of a command file
 * @typedef {object} BotCommand
 * @property {CommandData} data
 * @property {CommandFunction} execute
 */

/**
 * @typedef {BaseCommandData & import("discord.js").ApplicationCommandData} CommandData
 */

/**
 * @typedef {object} BaseCommandData
 * @property {string} category
 * @property {Deployments} [deployment]
 * @property {boolean} [defer]
 * @property {boolean} [ephemeral]
 * @property {"command"} module Bot module type
 */

/**
 * @typedef {BaseCommandInteraction & (import("discord.js").ChatInputCommandInteraction | import("discord.js").UserContextMenuCommandInteraction | import("discord.js").MessageContextMenuCommandInteraction)} CommandInteraction
 */

/**
 * @typedef {object} BaseCommandInteraction
 * @property {import("./class/discordBot").DiscordBot} bot
 */

/**
 * @callback CommandFunction
 * @param {CommandInteraction} interaction
 * @returns {Promise<import("discord.js").InteractionReplyOptions | string | void> | import("discord.js").InteractionReplyOptions| string | void}
 */

// Event

/**
 * The full object of a event file
 * @template {keyof import("discord.js").ClientEvents} Key
 * @typedef {object} BotEvent
 * @property {EventData<Key>} data
 * @property {EventFunction<Key>} execute
 */

/**
 * @template {keyof import("discord.js").ClientEvents} Key
 * @typedef {object} EventData
 * @property {Key} name Event name / caller
 * @property {"event"} module Bot module type
 */

/**
 * @template {keyof import("discord.js").ClientEvents} Key
 * @callback EventFunction
 * @param {import("./class/discordBot").DiscordBot} bot
 * @param {...import("discord.js").ClientEvents[Key]} args
 * @returns {any}
 */

module.exports = {};
