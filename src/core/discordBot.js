const { BotCommandDeployment } = require("../entities/command");
const {
    FilePath,
    aFilePath,
    allFilePaths,
    storeFilePathsInFolders
} = require("@disqada/pathfinder");
const {
    ApplicationCommandType,
    Client,
    Collection,
    Events,
    GatewayIntentBits
} = require("discord.js");
const { BotStyle } = require("../config/style");
const { BotCommand } = require("../entities/command");
const { BotEvent } = require("../entities/event");
const interactionCreate = require("../events/interactionCreate");
const ready = require("../events/ready");
const { Modules, RecordStates } = require("../data/enums");
const { Logger } = require("./logger");
require("dotenv").config();

/**
 * @typedef {object} DiscordBotData
 * @property {string} rootDirectory
 * @interface
 */

class DiscordBot {
    vars = {};
    info = { clientId: "" };

    commands = new Collection();

    constructor(
        data = {
            rootDirectory: "bot"
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

        storeFilePathsInFolders([data.rootDirectory], true);

        this.runBot();
    }

    async runBot() {
        await this.retrieveData("info", (data) => {
            Object.assign(this.info, data);
        });

        await this.retrieveData("vars", (data) => {
            Object.assign(this.vars, data);
        });

        await this.retrieveData("style", (data) => {
            this.style = new BotStyle(data);
        });

        await this.registerAllModules();
        this.runCoreEvents();

        await this.client.login(process.env.TOKEN);
    }

    runCoreEvents() {
        this.client.on(Events.ClientReady, () => ready(this));
        this.client.on(Events.InteractionCreate, (interaction) => {
            const botInteraction = interaction;
            botInteraction.bot = this;
            interactionCreate(botInteraction);
        });
    }

    async retrieveData(fileName, useData) {
        const filePath = aFilePath(fileName);
        if (filePath && filePath instanceof FilePath) {
            const data = require(filePath.fullPath);
            if (data) {
                useData(data);
            }
        } else {
            throw new Error(`Could not find ${fileName}`);
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
