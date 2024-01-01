/**
 * @typedef {object} StyleOptions
 * @property {boolean} skipFooter
 */

// Enum

/**
 * Possible types for a bot module
 * @typedef {'command' | 'event' | 'event-repeat'} Modules
 */

/**
 * Deployment of a bot module
 * @typedef {'global' | 'dev' | 'support'} Deployments
 */

/**
 * Symbols for time units
 * @typedef {'ms' | 's' | 'm' | 'h' | 'd' | 'w'} TimeUnits
 */

// Core

/**
 * @typedef {object} BotOptions
 * @property {string} token The bot application's API token.
 * @property {object} [directories]
 * @property {string} [directories.root] - The path to the folder containing all the bot files.
 * @property {string} [directories.data] - The Path to the directory the json data files.
 * @property {import('discord.js').ClientOptions} client
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
 * @property {PresenceData} presence
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
 * @typedef {BaseCommandData & import('discord.js').ApplicationCommandData} CommandData
 */

/**
 * @typedef {object} BaseCommandData
 * @property {string} category
 * @property {Deployments} [deployment]
 * @property {boolean} [defer]
 * @property {boolean} [ephemeral]
 * @property {'command'} module Bot module type
 */

/**
 * @typedef {BaseCommandInteraction & (import('discord.js').ChatInputCommandInteraction | import('discord.js').UserContextMenuCommandInteraction | import('discord.js').MessageContextMenuCommandInteraction)} CommandInteraction
 */

/**
 * @typedef {object} BaseCommandInteraction
 * @property {import('./class/discordBot').DiscordBot} bot
 */

/**
 * @callback CommandFunction
 * @param {CommandInteraction} interaction
 * @returns {Promise<import('discord.js').InteractionReplyOptions | string | void> | import('discord.js').InteractionReplyOptions| string | void}
 */

// Event

/**
 * All types of bot events
 * @typedef {ClientEvent<any> | RepeatingEvent} BotEvent
 */

/**
 * The full object of a event file
 * @template {keyof import('discord.js').ClientEvents} Key
 * @typedef {object} ClientEvent
 * @property {ClientEventData<Key>} data
 * @property {ClientEventFunction<Key>} execute
 */

/**
 * @template {keyof import('discord.js').ClientEvents} Key
 * @typedef {object} ClientEventData
 * @property {Key} name Event name / caller
 * @property {boolean} [once] Whether the event should be called once
 * @property {'event'} module Bot module type
 */

/**
 * @template {keyof import('discord.js').ClientEvents} Key
 * @callback ClientEventFunction
 * @param {import('./class/discordBot').DiscordBot} bot
 * @param {...import('discord.js').ClientEvents[Key]} args
 * @returns {any}
 */

/**
 * The full object of a event file
 * @typedef {object} RepeatingEvent
 * @property {RepeatingEventData} data
 * @property {RepeatingEventFunction} execute
 */

/**
 * @typedef {object} RepeatingEventData
 * @property {number | string} wait The time to wait between each execution
 * @property {number | string} [firstWait] The time to wait before the first execution
 * @property {'event-repeat'} module Bot module type
 */

/**
 * @callback RepeatingEventFunction
 * @param {import('./class/discordBot').DiscordBot} bot
 * @returns {Promise<void | number | string>}
 */

// Discord

/**
 * the combined sum of characters in all `title`, `description`, `field.name`, `field.value`, `footer.text`, and `author.name` fields across all embeds attached to a message must not exceed 6000 characters
 * @typedef {object} Embed
 * @property {string} [url]
 * @property {string} [title] max length = 256
 * @property {string} [description] max length = 4096
 * @property {number} [color] integer value representing color
 * @property {Timestamp} [timestamp]
 * @property {EmbedAuthor} [author]
 * @property {EmbedImage} [image]
 * @property {EmbedThumbnail} [thumbnail]
 * @property {EmbedFooter} [footer]
 * @property {EmbedField[]} [fields] max length = 25
 */

/**
 * @typedef {object} EmbedAuthor
 * @property {string} name max length = 256
 * @property {string} [url] only supports http(s)
 * @property {string} [iconUrl] only supports http(s) and attachments
 * @property {string} [proxyIconUrl]
 */

/**
 * @typedef {object} EmbedImage
 * @property {string} url
 * @property {string} [proxyUrl]
 * @property {number} [height] integer
 * @property {number} [width] integer
 */

/**
 * @typedef {object} EmbedThumbnail
 * @property {string} url
 * @property {string} [proxyUrl]
 * @property {number} [height] integer
 * @property {number} [width] integer
 */

/**
 * @typedef {object} EmbedFooter
 * @property {string} text max length = 2048
 * @property {string} [iconUrl] only supports http(s) and attachments
 * @property {string} [proxyIconUrl]
 */

/**
 * @typedef {object} EmbedField
 * @property {string} name max length = 256
 * @property {string} value max length = 1024
 * @property {boolean} [inline] whether to display this field inline with other fields
 */

/**
 * ISO 8601 timestamp, example: `2022-09-27 18:00:00.000`
 * @typedef {`${string}-${string}-${string}`} Timestamp
 */

/**
 * @typedef {object} PresenceData
 * @property {PresenceStatusData} [status]
 * @property {boolean} [afk]
 * @property {ActivitiesOptions[]} [activities]
 * @property {number | number[]} [shardId]
 */

/**
 * @typedef {ClientPresenceStatus | 'invisible'} PresenceStatusData
 */

/**
 * @typedef {'online' | 'idle' | 'dnd'} ClientPresenceStatus
 */

/**
 * @typedef {Omit<ActivityOptions, 'shardId'>} ActivitiesOptions
 */
/**
 * @typedef {object} ActivityOptions
 * @property {string} [name]
 * @property {string} [url]
 * @property {Exclude<ActivityType, 4>} [type]
 * @property {number | readonly number[]} [shardId]
 */

/**
 * @enum {number}
 * @typedef {0 | 1 | 2 | 3 | 4 | 5} ActivityType
 * @property {0} Playing Playing {game}
 * @property {1} Streaming Streaming {details}
 * @property {2} Listening Listening to {name}
 * @property {3} Watching Watching {details}
 * @property {4} Custom {emoji} {details}
 * @property {5} Competing Competing in {name}
 * @see https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types
 */

module.exports = {}
