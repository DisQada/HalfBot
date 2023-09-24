const discordBot = require("./core/discordBot");
const command = require("./entities/command");
const event = require("./entities/event");
const { asNumber, asString } = require("./func/colour");
const { applyToEmbed, applyToEmbeds, applyTo } = require("./func/style");
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
    applyToEmbed,
    applyToEmbeds,
    applyTo,
    emojiCharacters,
    safeDomains
};
