const { DiscordBot } = require("./class/discordBot");
const { asNumber, asString } = require("./func/colour");
const { asEmbed, applyStyle } = require("./func/style");
const emojiChars = require("./data/emojiChars.json");

module.exports = {
    DiscordBot,
    asNumber,
    asString,
    asEmbed,
    applyStyle,
    emojiChars
};
