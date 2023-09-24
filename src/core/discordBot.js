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
const { logRecords } = require("./logger");
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

    async registerAllModules() {
        const filePaths = allFilePaths()?.filter(
            (path) =>
                path.fullPath.includes(Modules.Commands) ||
                path.fullPath.includes(Modules.Events)
        );
        if (!filePaths || filePaths.length === 0) {
            return;
        }

        const records = [[], []];

        for (let i = 0; i < filePaths.length; i++) {
            const botModule = require(filePaths[i].fullPath);

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
            const index = filePaths[i].fullPath.indexOf(word);
            records[RecordStates.Fail].push({
                path: filePaths[i].fullPath.substring(index + word.length + 1),
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
