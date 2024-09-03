/** @import {ApplicationCommandData, ChatInputCommandInteraction, ClientOptions, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction, InteractionReplyOptions, ClientEvents} from 'discord.js' */
/** @import {Bot} from './class/bot.js' */

export {}

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
 * @property {BotDirectories} [directories]
 * @property {ClientOptions} [client]
 */

/**
 * @typedef {object} BotDirectories
 * @property {string} [root='bot'] - The path to the folder containing all the bot files.
 * @property {string} [data='data'] - The Path to the directory the json data files.
 */

/** @typedef {BaseData & KeyAnyObj} BotData */

/**
 * @typedef {object} BaseData
 * @property {Config} config
 * @property {Brand} brand - The container of the bot's brand information.
 * @property {IDs} id - The container of all IDs.
 */

// Config

/**
 * @typedef {object} Config
 * @property {PresenceData} presence
 */

/**
 * The container of all IDs
 * @typedef {object} Brand
 * @property {string} name
 * @property {number} color hex color
 * @property {string} logoUrl
 */

/**
 * The container of all IDs
 * @typedef {object} IDs
 * @property {RoleIDs} role The IDs of all roles
 * @property {KeyAnyObj} user The IDs of all users
 * @property {GuildIDs} guild The IDs of all servers
 * @property {ChannelIDs} channel The IDs of all channels
 * @property {KeyAnyObj} [thread] The IDs of all threads
 * @property {KeyAnyObj} [message] The IDs of all messages
 * @property {EmojiIDs} [emoji] The IDs of all emojis
 * @property {KeyAnyObj} [sticker] The IDs of all stickers
 * @property {KeyAnyObj} [command] The IDs of all commands
 * @property {KeyAnyObj} [webhook] The IDs of all webhooks
 * @property {KeyAnyObj} [invite] The IDs of all invites
 */

/**
 * The IDs of all servers
 * @typedef {object} GuildIDs
 * @property {string} [dev] The id of the development / testing server
 * @property {string} [support] The id of the support / main
 */

/**
 * @typedef {object} ChannelIDs
 * @property {string} [dev] The id of the development / testing server
 * @property {string} [error] The id of the error log channel
 * @property {string} [rules] The id of the rules channel
 * @property {string} [welcome] The id of the welcome channel
 */

/**
 * @typedef {object} RoleIDs
 * @property {string[] | KeyStrObj} [categories] The ids of all role categories
 * @property {string} [admin] The id of the admin role
 * @property {string} [mod] The id of the mod role
 */

/**
 * @typedef {object} UserIDs
 * @property {string} [owner] The id of the bot owner
 * @property {string[] | KeyStrObj} [dev] The id of the developer
 * @property {string[] | KeyStrObj} [support] The id of the support team
 */

/**
 * @typedef {object} EmojiIDs
 * @property {string} [yes] The id of the checkmark emoji
 * @property {string} [no] The id of the cross emoji
 * @property {string} [up] The id of the up arrow emoji
 * @property {string} [down] The id of the down arrow emoji
 */

/** @typedef {{[key:string]:string}} KeyStrObj */
/** @typedef {{[key:string]:any}} KeyAnyObj */

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
 * @typedef {BaseCommandData & ApplicationCommandData} CommandData
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
 * @typedef {BaseCommandInteraction & (ChatInputCommandInteraction | UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction)} CommandInteraction
 */

/**
 * @typedef {object} BaseCommandInteraction
 * @property {Bot} bot
 */

/**
 * @callback CommandFunction
 * @param {CommandInteraction} interaction
 * @returns {Promise<InteractionReplyOptions | string | void> | InteractionReplyOptions | string | void}
 */

// Event

/**
 * All types of bot events
 * @typedef {ClientEvent<any> | RepeatingEvent} BotEvent
 */

/**
 * The full object of a event file
 * @template {keyof ClientEvents} Key
 * @typedef {object} ClientEvent
 * @property {ClientEventData<Key>} data
 * @property {ClientEventFunction<Key>} execute
 */

/**
 * @template {keyof ClientEvents} Key
 * @typedef {object} ClientEventData
 * @property {Key} name Event name / caller
 * @property {boolean} [once] Whether the event should be called once
 * @property {'event'} module Bot module type
 */

/**
 * @template {keyof ClientEvents} Key
 * @callback ClientEventFunction
 * @param {Bot} bot
 * @param {...ClientEvents[Key]} args
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
 * @param {Bot} bot
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
