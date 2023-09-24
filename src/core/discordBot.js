const { BotCommandDeployment } = require("../entities/command");
const {
    allFilePaths,
    storeFilePathsInFolders,
    getFilePathsInFolder
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
const ready = require("../events/ready");
const { Modules, RecordStates } = require("../data/enums");
const { Logger } = require("./logger");
const { resolve, sep } = require("path");
require("dotenv").config();

/**
 * @typedef {object} DiscordBotData
 * @property {string} rootDirectory
 * @property {string} dataDirectory
 * @interface
 */

class DiscordBot {
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

    commands = new Collection();

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

    async runBot(data) {
        await storeFilePathsInFolders([data.rootDirectory], true);
        await this.retrieveData(data.dataDirectory);
        await this.registerAllModules();
        this.listenToEvents();

        await this.client.login(process.env.TOKEN);
    }

    listenToEvents() {
        this.client.on(Events.ClientReady, () => ready(this));
        this.client.on(Events.InteractionCreate, (interaction) => {
            interaction.bot = this;
            interactionCreate(interaction);
        });
    }

    async retrieveData(dataDirectory) {
        const files = await getFilePathsInFolder(resolve(dataDirectory), false);
        for (let i = 0; i < files.length; i++) {
            const index1 = files[i].indexOf(sep);
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

    async registerCommand(command) {
        if (command.data.types.chatInput) {
            command.data.type = ApplicationCommandType.ChatInput;
            this.commands.set(command.data.name, command);
        }

        if (command.data.types.contextMenu) {
            // Note: The 2 is ApplicationCommandType.User
            command.data.type = command.data.types.contextMenu + 2;
            this.commands.set(command.data.name, command);
        }
    }

    async registerEvent(event) {
        this.client.on(event.data.name, (...args) =>
            event.execute(this, ...args)
        );
    }

    async registerAllModules() {
        const filePaths = allFilePaths()?.filter(
            (path) =>
                path.fullPath.includes(Modules.Commands) ||
                path.fullPath.includes(Modules.Events)
        );
        if (!filePaths) {
            return;
        }

        const logger = new Logger();

        for (const filePath of filePaths) {
            const botModule = require(filePath.fullPath);

            let name;
            if (typeof botModule === "object" && botModule?.data?.name) {
                name = botModule?.data?.name;
            } else {
                const word = "modules";
                const index = filePath.fullPath.indexOf(word);
                name = filePath.fullPath.substring(index + word.length);
            }

            const record = {
                name: name,
                state: RecordStates.Success
            };

            if (botModule instanceof BotCommand) {
                record.type = Modules.Commands;
                record.deployment = botModule.data.deployment;

                if (BotCommand.isValid(botModule)) {
                    this.registerCommand(botModule);
                } else {
                    record.state = RecordStates.Fail;
                    record.message = `The command is invalid, a required property is missing`;
                }
            } else if (botModule instanceof BotEvent) {
                record.type = Modules.Events;
                record.deployment = BotCommandDeployment.Global;

                if (BotEvent.isValid(botModule)) {
                    this.registerEvent(botModule);
                } else {
                    record.state = RecordStates.Fail;
                    record.message = `The module is invalid, a required property is missing`;
                }
            } else {
                record.state = RecordStates.Error;
                record.message = "The file was empty or not exported correctly";
            }

            logger.add(record);
        }

        Logger.debug(logger);
    }
}

module.exports = {
    DiscordBot
};
