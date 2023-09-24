const discordBot = require("./core/discordBot");
const command = require("./entities/command");
const event = require("./entities/event");
const { asNumber, asString } = require("./func/colour");
const { applyStyle } = require("./func/style");
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
    applyStyle,
    emojiCharacters,
    safeDomains
};
