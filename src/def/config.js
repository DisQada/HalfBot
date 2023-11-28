/**
 * @typedef {object} Config
 * @property {IDs} id - The container of all IDs.
 * @property {Brand} brand - The container of the bot's brand information.
 * @property {import("discord.js").PresenceData} presence
 */

/**
 * The container of all IDs
 * @typedef {object} Brand
 * @prop {string} name
 * @prop {number} colour hex colour
 * @prop {string} logoUrl
 */

/**
 * The container of all IDs
 * @typedef {object} IDs
 * @prop {GuildIDs} guild The IDs of all servers
 */

/**
 * The IDs of all servers
 * @typedef {object} GuildIDs
 * @prop {string} [dev] The id of the development / testing server
 * @prop {string} [support] The id of the support / main
 */

module.exports = {};
