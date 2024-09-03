/** @import {ApplicationCommandData, ChatInputCommandInteraction, ClientOptions, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction, InteractionReplyOptions, ClientEvents} from 'discord.js' */
/** @import {Bot} from './class/bot.js' */

export {}

/**
 * Options for styling the bot's responses.
 * @typedef {object} StyleOptions
 * @property {boolean} skipFooter - Determines whether to skip adding a footer to the message.
 */

// Enum

/**
 * Possible types for a bot module.
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
 * Options for initializing the bot.
 * @typedef {object} BotOptions
 * @property {string} token - The bot application's API token.
 * @property {BotDirectories} [directories] - Directories used by the bot.
 * @property {ClientOptions} [client] - Discord client options.
 */

/**
 * Directories used by the bot for organizing files and data.
 * @typedef {object} BotDirectories
 * @property {string} [root='bot'] - The path to the folder containing all the bot files.
 * @property {string} [data='data'] - The Path to the directory the json data files.
 */

/**
 * Combined data type that includes base bot data and additional key-value pairs.
 * @typedef {BaseData & KeyAnyObj} BotData
 */

/**
 * Basic data structure for the bot.
 * @typedef {object} BaseData
 * @property {Config} config - The bot's configuration settings.
 * @property {Brand} brand - Information related to the bot's branding.
 * @property {IDs} id - A collection of various IDs used by the bot.
 */

// Config

/**
 * Configuration settings for the bot.
 * @typedef {object} Config
 * @property {PresenceData} presence - Data related to the bot's presence on Discord.
 */

/**
 * Brand information for the bot.
 * @typedef {object} Brand
 * @property {string} name - The name of the bot.
 * @property {number} color - The bot's primary color, represented as a hexadecimal number.
 * @property {string} logoUrl - The URL to the bot's logo.
 */

/**
 * A collection of various IDs used by the bot.
 * @typedef {object} IDs
 * @property {RoleIDs} role - A collection of role IDs.
 * @property {KeyAnyObj} user - A collection of user IDs.
 * @property {GuildIDs} guild - A collection of guild (server) IDs.
 * @property {ChannelIDs} channel - A collection of channel IDs.
 * @property {KeyAnyObj} [thread] - A collection of thread IDs.
 * @property {KeyAnyObj} [message] - A collection of message IDs.
 * @property {EmojiIDs} [emoji] - A collection of emoji IDs.
 * @property {KeyAnyObj} [sticker] - A collection of sticker IDs.
 * @property {KeyAnyObj} [command] - A collection of command IDs.
 * @property {KeyAnyObj} [webhook] - A collection of webhook IDs.
 * @property {KeyAnyObj} [invite] - A collection of invite IDs.
 */

/**
 * A collection of IDs for different guilds (servers).
 * @typedef {object} GuildIDs
 * @property {string} [dev] - The ID of the development/testing server.
 * @property {string} [support] - The ID of the support/main server.
 */

/**
 * A collection of channel IDs used by the bot.
 * @typedef {object} ChannelIDs
 * @property {string} [dev] - The ID of the development/testing server's main channel.
 * @property {string} [error] - The ID of the error log channel.
 * @property {string} [rules] - The ID of the rules channel.
 * @property {string} [welcome] - The ID of the welcome channel.
 */

/**
 * A collection of role IDs used by the bot.
 * @typedef {object} RoleIDs
 * @property {string[] | KeyStrObj} [categories] - The IDs of all role categories.
 * @property {string} [admin] - The ID of the admin role.
 * @property {string} [mod] - The ID of the mod role.
 */

/**
 * A collection of user IDs used by the bot.
 * @typedef {object} UserIDs
 * @property {string} [owner] - The ID of the bot owner.
 * @property {string[] | KeyStrObj} [dev] - The IDs of the developers.
 * @property {string[] | KeyStrObj} [support] - The IDs of the support team members.
 */

/**
 * A collection of emoji IDs used by the bot.
 * @typedef {object} EmojiIDs
 * @property {string} [yes] - The ID of the checkmark emoji.
 * @property {string} [no] - The ID of the cross emoji.
 * @property {string} [up] - The ID of the up arrow emoji.
 * @property {string} [down] - The ID of the down arrow emoji.
 */

/**
 * A key-value mapping where keys are strings and values are strings.
 * @typedef {{[key:string]:string}} KeyStrObj
 */

/**
 * A key-value mapping where keys are strings and values can be of any type.
 * @typedef {{[key:string]:any}} KeyAnyObj
 */

// Record

/**
 * Record of the bot's module registration status.
 * @typedef {SuccessRecord | FailRecord} Record
 */

/**
 * A record indicating successful module registration.
 * @typedef {object} SuccessRecord
 * @property {string} name - The name of the module.
 * @property {Modules} type - The type of the bot module.
 * @property {Deployments} deployment - The servers to which the module is deployed.
 * @private
 */

/**
 * A record indicating failed module registration.
 * @typedef {object} FailRecord
 * @property {string} path - The file path of the module that failed to register.
 * @property {string} message - Information about the failure.
 * @private
 */

// Command

/**
 * The full structure of a command file used by the bot.
 * @typedef {object} BotCommand
 * @property {CommandData} data - Data related to the command.
 * @property {CommandFunction} execute - The function executed when the command is called.
 */

/**
 * Data for defining a command, extending Discord's ApplicationCommandData.
 * @typedef {BaseCommandData & ApplicationCommandData} CommandData
 */

/**
 * Basic data structure for commands.
 * @typedef {object} BaseCommandData
 * @property {string} category - The category to which the command belongs.
 * @property {Deployments} [deployment] - The environment where the command is deployed.
 * @property {boolean} [defer] - Whether to defer the reply to the command interaction.
 * @property {boolean} [ephemeral] - Whether the command response should be ephemeral (only visible to the user who invoked the command).
 * @property {'command'} module - The type of the bot module.
 */

/**
 * Interaction object passed to a command function.
 * @typedef {BaseCommandInteraction & (ChatInputCommandInteraction | UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction)} CommandInteraction
 */

/**
 * Base structure for command interactions.
 * @typedef {object} BaseCommandInteraction
 * @property {Bot} bot - The bot instance that received the interaction.
 * @property {string} category - The category of the command.
 */

/**
 * Function executed when a bot command is called.
 * @callback CommandFunction
 * @param {CommandInteraction} interaction - The interaction object passed to the command function.
 * @returns {Promise<InteractionReplyOptions | string | void> | InteractionReplyOptions | string | void} - A promise that resolves when the command execution is complete.
 */

// Event

/**
 * Represents all types of bot events.
 * @typedef {ClientEvent<any> | RepeatingEvent} BotEvent
 */

/**
 * Represents the full structure of an event file used by the bot.
 * @template {keyof ClientEvents} Key
 * @typedef {object} ClientEvent
 * @property {ClientEventData<Key>} data - The data associated with the event, including the event name and options.
 * @property {ClientEventFunction<Key>} execute - The function that executes when the event is triggered.
 */

/**
 * Represents the data structure for a client event.
 * @template {keyof ClientEvents} Key
 * @typedef {object} ClientEventData
 * @property {Key} name - The name of the event to listen for.
 * @property {boolean} [once=false] - Indicates whether the event should only be handled once.
 * @property {'event'} module - The module type, identifying this as an event module.
 */

/**
 * Represents the function executed when a bot event is triggered.
 * @template {keyof ClientEvents} Key
 * @callback ClientEventFunction
 * @param {Bot} bot - The bot instance that triggered the event.
 * @param {...ClientEvents[Key]} args - Additional arguments passed to the event handler.
 * @returns {any} - The return value of the event function, if any.
 */

/**
 * Represents the full structure of a repeating event file.
 * @typedef {object} RepeatingEvent
 * @property {RepeatingEventData} data - The data associated with the repeating event, including timing details.
 * @property {RepeatingEventFunction} execute - The function that executes on a repeating interval.
 */

/**
 * Represents the data structure for a repeating event.
 * @typedef {object} RepeatingEventData
 * @property {number | string} wait - The time to wait between each execution, expressed as a number (milliseconds) or a string (e.g., '5m' for 5 minutes).
 * @property {number | string} [firstWait] - The time to wait before the first execution, expressed similarly to `wait`.
 * @property {'event-repeat'} module - The module type, identifying this as a repeating event module.
 */

/**
 * Represents the function executed on a repeating interval.
 * @callback RepeatingEventFunction
 * @param {Bot} bot - The bot instance that is executing the repeating event.
 * @returns {Promise<void | number | string>} - A promise that resolves when the event execution is complete or returns a value that determines the next wait time.
 */

// Discord

/**
 * Represents a Discord embed, used to format rich content.
 *
 * the combined sum of characters in all `title`, `description`, `field.name`, `field.value`, `footer.text`, and `author.name` fields across all embeds attached to a message must not exceed 6000 characters
 * @typedef {object} Embed
 * @property {string} [url] - The URL of the embed.
 * @property {string} [title] - The title of the embed, with a maximum length of 256 characters.
 * @property {string} [description] - The description text of the embed, with a maximum length of 4096 characters.
 * @property {number} [color] - The color of the embed, represented as an integer value.
 * @property {Timestamp} [timestamp] - The timestamp displayed in the embed, formatted in ISO 8601.
 * @property {EmbedAuthor} [author] - The author information displayed in the embed.
 * @property {EmbedImage} [image] - The image displayed in the embed.
 * @property {EmbedThumbnail} [thumbnail] - The thumbnail image displayed in the embed.
 * @property {EmbedFooter} [footer] - The footer information displayed in the embed.
 * @property {EmbedField[]} [fields] - An array of field objects, with a maximum length of 25.
 */

/**
 * Represents the author of an embed.
 * @typedef {object} EmbedAuthor
 * @property {string} name - The name of the author, with a maximum length of 256 characters.
 * @property {string} [url] - The URL of the author, supporting only http(s).
 * @property {string} [iconUrl] - The URL of the author's icon, supporting only http(s) and attachments.
 * @property {string} [proxyIconUrl] - A proxy URL of the author's icon.
 */

/**
 * Represents an image in an embed.
 * @typedef {object} EmbedImage
 * @property {string} url - The URL of the image.
 * @property {string} [proxyUrl] - A proxy URL of the image.
 * @property {number} [height] - The height of the image, specified as an integer.
 * @property {number} [width] - The width of the image, specified as an integer.
 */

/**
 * Represents a thumbnail image in an embed.
 * @typedef {object} EmbedThumbnail
 * @property {string} url - The URL of the thumbnail image.
 * @property {string} [proxyUrl] - A proxy URL of the thumbnail image.
 * @property {number} [height] - The height of the thumbnail image, specified as an integer.
 * @property {number} [width] - The width of the thumbnail image, specified as an integer.
 */

/**
 * Represents the footer of an embed.
 * @typedef {object} EmbedFooter
 * @property {string} text - The footer text, with a maximum length of 2048 characters.
 * @property {string} [iconUrl] - The URL of the footer's icon, supporting only http(s) and attachments.
 * @property {string} [proxyIconUrl] - A proxy URL of the footer's icon.
 */

/**
 * Represents a field within an embed.
 * @typedef {object} EmbedField
 * @property {string} name - The name of the field, with a maximum length of 256 characters.
 * @property {string} value - The value of the field, with a maximum length of 1024 characters.
 * @property {boolean} [inline=false] - Indicates whether the field should be displayed inline with other fields.
 */

/**
 * Represents an ISO 8601 timestamp. Example: 2022-09-27 18:00:00.000
 * @typedef {`${string}-${string}-${string}`} Timestamp
 */

/**
 * Represents the presence data for a bot.
 * @typedef {object} PresenceData
 * @property {PresenceStatusData} [status] - The status of the bot, such as online or idle.
 * @property {boolean} [afk=false] - Indicates whether the bot is marked as AFK (away from keyboard).
 * @property {ActivitiesOptions[]} [activities] - An array of activity objects representing the bot's current activities.
 * @property {number | number[]} [shardId] - The shard ID(s) associated with the bot's presence.
 */

/**
 * Represents the status of a bot's presence.
 * @typedef {ClientPresenceStatus | 'invisible'} PresenceStatusData
 */

/**
 * Represents the possible statuses for a bot's presence.
 * @typedef {'online' | 'idle' | 'dnd'} ClientPresenceStatus
 */

/**
 * Represents options for a bot's activities.
 * @typedef {Omit<ActivityOptions, 'shardId'>} ActivitiesOptions
 */

/**
 * Represents the options for an activity.
 * @typedef {object} ActivityOptions
 * @property {string} [name] - The name of the activity.
 * @property {string} [url] - The URL associated with the activity.
 * @property {Exclude<ActivityType, 4>} [type] - The type of activity, excluding custom activities.
 * @property {number | readonly number[]} [shardId] - The shard ID(s) associated with the activity.
 */

/**
 * Represents the different types of activities a bot can display.
 * https://discord.com/developers/docs/topics/gateway-events#activity-object-activity-types
 *
 * - 0 Playing - Represents a bot that is playing a game.
 * - 1 Streaming - Represents a bot that is streaming content.
 * - 2 Listening - Represents a bot that is listening to something.
 * - 3 Watching - Represents a bot that is watching something.
 * - 4 Custom - Represents a custom activity with an emoji and details.
 * - 5 Competing - Represents a bot that is competing in something.
 * @typedef {0 | 1 | 2 | 3 | 4 | 5} ActivityType
 */
