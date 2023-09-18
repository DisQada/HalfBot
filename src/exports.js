const info = require("./config/info");
const style = require("./config/style");
const vars = require("./config/vars");
const discordBot = require("./core/discordBot");
const command = require("./entities/command");
const event = require("./entities/event");
const colour = require("./helpers/classes/colour");
const importer = require("./helpers/classes/importer");
const link = require("./helpers/classes/link");
const emojiCharacters = require("./helpers/data/emojiCharacters");
const safeDomains = require("./helpers/data/safeDomains");

module.exports = {
    info,
    style,
    vars,
    discordBot,
    command,
    event,
    colour,
    importer,
    link,
    emojiCharacters,
    safeDomains
};
