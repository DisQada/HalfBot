const info = require("./config/info");
const style = require("./config/style");
const discordBot = require("./core/discordBot");
const command = require("./entities/command");
const event = require("./entities/event");
const { asNumber, asString } = require("./func/colour");
const { isSafe } = require("./func/url");
const emojiCharacters = require("./data/emojiCharacters");
const safeDomains = require("./data/safeDomains");

module.exports = {
    info,
    style,
    discordBot,
    command,
    event,
    asNumber,
    asString,
    isSafe,
    emojiCharacters,
    safeDomains
};
