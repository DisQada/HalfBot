/* eslint-disable jsdoc/require-example */

const { BotCommandDeployment } = require("../entities/command");
const {
    findPaths,
    storeFolderPaths,
    readFolderPaths
} = require("@disqada/pathfinder");
const {
    ApplicationCommandType,
    Client,
    Collection,
    Events,
    GatewayIntentBits
} = require("discord.js");
const { BotCommand } = require("../entities/command");
const { BotEvent } = require("../entities/event");
const interactionCreate = require("../events/interactionCreate");
const { ready } = require("../events/ready");
const { Modules, RecordStates } = require("../data/enums");
const { logRecords } = require("./logger");
const { resolve, sep } = require("path");

/**
 * @typedef {object} DiscordBotData
 * @property {string} token The bot application's API token.
 * @property {string} rootDirectory - The path to the folder containing all the bot files.
 * @property {string} dataDirectory - The Path to the directory the json data files.
 * @interface
 */

/**
 * @class
 */
class DiscordBot {
    /**
     * @type {object}
     * @property {BotConfig} config
     */
    data = {
        config: {
            id: {
                guild: {}
            },
            brand: {
                name: "halfbot",
                colour: 0xffffff,
                logoUrl: "https://cdn.discordapp.com/embed/avatars/0.png"
            }
        }
    };

    /**
     * @type {Collection<BotCommand>}
     */
    commands = new Collection();

    /**
     * The initialization of a new DiscordBot.
     * @param {DiscordBotData} data - Information about the DiscordBot.
     * @param {ClientOptions} options - The bot's client options.
     */
    constructor(
        data = {
            rootDirectory: "bot",
            dataDirectory: "bot/data"
        },
        options = {
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers
            ]
        }
    ) {
        // TODO Check token and clientId validity
        this.client = new Client(options);
        this.runBot(data);
    }

    /**
     * Start and connect the bot.
     * @param {DiscordBotData} data - Information about the DiscordBot.
     * @returns {Promise<undefined>}
     * @private
     */
    async runBot(data) {
        await storeFolderPaths([data.rootDirectory], {
            deepSearch: true
        });
        await this.retrieveData(data.dataDirectory);
        await this.registerAllModules();
        this.listenToEvents();

        await this.client.login(data.token);
    }

    /**
     * Subscribe to the core events.
     * @returns {undefined}
     * @private
     */
    listenToEvents() {
        this.client.on(Events.ClientReady, () => ready(this));
        this.client.on(Events.InteractionCreate, (interaction) => {
            interaction.bot = this;
            interactionCreate(interaction);
        });
    }

    /**
     * Inject data from the workspace files.
     * @param {string} dataDirectory - The path to the directory the json data files.
     * @returns {Promise<undefined>}
     * @private
     */
    async retrieveData(dataDirectory) {
        const files = await readFolderPaths(resolve(dataDirectory), {
            deepSearch: false
        });
        for (let i = 0; i < files.length; i++) {
            const index1 = files[i].lastIndexOf(sep);
            const index2 = files[i].length - ".json".length;
            const name = files[i].substring(index1 + sep.length, index2);

            const data = require(files[i]);
            if (data) {
                if (name === "config") {
                    Object.assign(this.data.config, data);
                } else {
                    this.data[name] = data;
                }
            }
        }
    }

    /**
     * Register a command inside the bot.
     * @param {BotCommand} command - The bot command module.
     * @returns {undefined}
     * @private
     */
    registerCommand(command) {
        if (command.data.types.chatInput) {
            command.data.type = ApplicationCommandType.ChatInput;
            this.commands.set(command.data.name, command);
        }

        if (command.data.types.contextMenu) {
            // Note: The 2 is ApplicationCommandType.User
            command.data.type = command.data.types.contextMenu + 2;
            this.commands.set(command.data.name, command);
        }

        return {
            name: command.data.name,
            type: Modules.Commands,
            deployment: command.data.deployment
        };
    }

    /**
     * Register an event inside the bot.
     * @param {BotEvent<any>} event - The bot event module.
     * @returns {undefined}
     * @private
     */
    registerEvent(event) {
        this.client.on(event.data.name, (...args) =>
            event.execute(this, ...args)
        );

        return {
            name: event.data.name,
            type: Modules.Events,
            deployment: BotCommandDeployment.Global
        };
    }

    /**
     * Register bot modules to the client.
     * @returns {Promise<undefined>}
     * @private
     */
    async registerAllModules() {
        const paths = findPaths()
            .filter(
                (fp) =>
                    fp.fullPath.includes(Modules.Commands) ||
                    fp.fullPath.includes(Modules.Events)
            )
            .map((fp) => fp.fullPath);
        if (paths.length === 0) {
            return;
        }

        const records = [[], []];

        for (let i = 0; i < paths.length; i++) {
            const botModule = require(paths[i]);
            if (
                botModule instanceof BotCommand &&
                BotCommand.isValid(botModule)
            ) {
                const record = this.registerCommand(botModule);
                records[RecordStates.Success].push(record);
                continue;
            } else if (
                botModule instanceof BotEvent &&
                BotEvent.isValid(botModule)
            ) {
                const record = this.registerEvent(botModule);
                records[RecordStates.Success].push(record);
                continue;
            }

            const word = "modules";
            const index = paths[i].indexOf(word);
            records[RecordStates.Fail].push({
                path: paths[i].substring(index + word.length + 1),
                message:
                    "The module is invalid, maybe a required property is missing"
            });
        }

        logRecords(records[RecordStates.Success], RecordStates.Success);
        logRecords(records[RecordStates.Fail], RecordStates.Fail);
    }
}

module.exports = {
    DiscordBot
};
