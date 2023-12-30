const { DiscordBot } = require("./core/discordBot");
const { asNumber, asString } = require("./func/colour");
const { asEmbed, applyStyle } = require("./func/style");
const { isSafe } = require("./func/url");
const emojiChars = require("./data/emojiChars.json");

module.exports = {
    DiscordBot,
    asNumber,
    asString,
    asEmbed,
    applyStyle,
    isSafe,
    emojiChars
};
