const discordBot = require("./core/discordBot");
const command = require("./entities/command");
const event = require("./entities/event");
const { asNumber, asString } = require("./func/colour");
const { asEmbed, applyStyle } = require("./func/style");
const { isSafe } = require("./func/url");
const emojiCharacters = require("./data/emojiCharacters");
const safeDomains = require("./data/safeDomains");

module.exports = {
    discordBot,
    command,
    event,
    asNumber,
    asString,
    isSafe,
    asEmbed,
    applyStyle,
    emojiCharacters,
    safeDomains
};
