import type { ClientOptions, Interaction } from "discord.js";
import type { BotInfoData } from "../config/info";
import type { BotStyleData } from "../config/style";
import type { BotCommandInteraction } from "../entities/command";

import {
    FilePath,
    aFilePath,
    allFilePaths,
    storeFilePathsInFolders
} from "@disqada/pathfinder";
import {
    ApplicationCommandType,
    Client,
    Collection,
    Events,
    GatewayIntentBits
} from "discord.js";
import { config } from "dotenv";
import { BotInfo } from "../config/info";
import { BotStyle } from "../config/style";
import { BotVars } from "../config/vars";
import { BotCommand } from "../entities/command";
import { BotEvent } from "../entities/event";
import interactionCreate from "../events/interactionCreate";
import ready from "../events/ready";
import Importer from "../helpers/classes/importer";
import { Modules, RecordStates } from "../helpers/data/enums";
import { Logger } from "./logger";
config();

export interface DiscordBotData {
    rootDirectory: string;
}

export class DiscordBot {
    public client: Client;
    public vars: BotVars = {};
    public info: BotInfo = { clientId: "" };
    public style?: BotStyle;

    public commands: Collection<string, BotCommand> = new Collection();

    public constructor(
        data: DiscordBotData = {
            rootDirectory: "bot"
        },
        options: ClientOptions = {
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

    private async runBot() {
        await this.retrieveData<BotInfoData>("info", (data) => {
            this.info = new BotInfo(data);
        });

        await this.retrieveData<object>("vars", (data) => {
            this.vars = new BotVars(data);
        });

        await this.retrieveData<BotStyleData>("style", (data) => {
            this.style = new BotStyle(data);
        });

        await this.registerAllModules();
        this.runCoreEvents();

        await this.client.login(process.env.TOKEN);
    }

    private runCoreEvents() {
        this.client.on(Events.ClientReady, () => ready(this));
        this.client.on(Events.InteractionCreate, (interaction: Interaction) => {
            const botInteraction: BotCommandInteraction =
                interaction as BotCommandInteraction;
            botInteraction.bot = this;
            interactionCreate(botInteraction);
        });
    }

    private async retrieveData<DataType>(
        fileName: string,
        useData: (data: DataType) => void
    ) {
        const filePath = aFilePath(fileName);
        if (filePath && filePath instanceof FilePath) {
            const data = await Importer.importFile<DataType>(filePath.fullPath);
            if (data) {
                useData(data);
            }
        } else {
            throw new Error(`Could not find ${fileName}`);
        }
    }

    private async registerCommands(command: BotCommand) {
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

    private async registerEvents(event: BotEvent<any>) {
        this.client.on(event.data.name, (...args: any) =>
            event.execute(this, ...args)
        );
    }

    private async registerAllModules() {
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
            const botModule: BotCommand | BotEvent<any> | any | void =
                await Importer.importFile(filePath.fullPath);

            if (botModule instanceof BotCommand) {
                if (BotCommand.isValid(botModule)) {
                    this.registerCommands(botModule);
                } else {
                    logger.add({
                        name: botModule.data.name,
                        deployment: botModule.data.deployment,
                        state: RecordStates.Fail,
                        message: "The module is invalid"
                    });
                }
            } else if (botModule instanceof BotEvent) {
                if (BotEvent.isValid(botModule)) {
                    this.registerEvents(botModule);
                } else {
                    logger.add({
                        name: botModule.data.name,
                        state: RecordStates.Fail,
                        message: "The module is invalid"
                    });
                }
            } else {
                let name = filePath.fullPath;
                if (typeof botModule === "object" && botModule?.data?.name) {
                    name = botModule?.data?.name;
                }

                logger.add({
                    name: name,
                    state: RecordStates.Error,
                    message: "Module file was empty or not exported correctly"
                });
            }
        }

        Logger.debug(logger);
    }
}
