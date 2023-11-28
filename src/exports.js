const { DiscordBot } = require("./core/discordBot");
const { BotCommand } = require("./entities/command");
const { BotEvent } = require("./entities/event");
const { asNumber, asString } = require("./func/colour");
const { asEmbed, applyStyle } = require("./func/style");
const { isSafe } = require("./func/url");
const emojiChars = require("./data/emojiChars.json");

module.exports = {
    DiscordBot,
    BotCommand,
    BotEvent,
    asNumber,
    asString,
    asEmbed,
    applyStyle,
    isSafe,
    emojiChars
};
