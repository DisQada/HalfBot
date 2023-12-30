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
 * @param {import("../core/discordBot").DiscordBot} bot
 * @param {...import("discord.js").ClientEvents[Key]} args
 * @returns {any}
 */

module.exports = {};
