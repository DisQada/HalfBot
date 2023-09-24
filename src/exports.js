const info = require("./config/info");
const style = require("./config/style");
const vars = require("./config/vars");
const discordBot = require("./core/discordBot");
const command = require("./entities/command");
const event = require("./entities/event");
const { asNumber, asString } = require("./helpers/classes/colour");
const { isSafe } = require("./helpers/classes/url");
const emojiCharacters = require("./helpers/data/emojiCharacters");
const safeDomains = require("./helpers/data/safeDomains");

module.exports = {
    info,
    style,
    vars,
    discordBot,
    command,
    event,
    asNumber,
    asString,
    isSafe,
    emojiCharacters,
    safeDomains
};
