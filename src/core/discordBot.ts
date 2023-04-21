import type { ClientOptions, Interaction } from "discord.js";
import type { BotInfoData } from "../config/info";
import type { BotStyleData } from "../config/style";
import type { BotCommandInteraction } from "../entities/command";
import type { Info } from "./extra";

import {
    aFilePath,
    allFilePaths,
    storeFilePathsInFolders
} from "@disqada/pathfinder";
import FilePath from "@disqada/pathfinder/dist/types/filePath";
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
import { BotCommand, BotCommandContextMenuType } from "../entities/command";
import { BotEvent } from "../entities/event";
import interactionCreate from "../events/interactionCreate";
import ready from "../events/ready";
import Importer from "../helpers/classes/importer";
import { Modules, checkData } from "./extra";
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

        await this.retrieveData<Object>("vars", (data) => {
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

    private async registerModules(module: Modules, callback: Function) {
        let files = allFilePaths()?.filter(
            (filePath: FilePath) => filePath.folder === module
        );
        if (!files) return;

        for (let i = 0; i < files.length; i++) {
            const filePath = files[i];

            if (filePath) {
                const info = await Importer.importFile(filePath.fullPath);
                if (info) {
                    checkData(
                        info as Info,
                        module,
                        filePath.fullPath,
                        callback
                    );
                }
            }
        }
    }

    private async registerAllModules() {
        await this.registerModules(Modules.Commands, (command: BotCommand) => {
            if (command.data.types.chatInput) {
                command.data.type = ApplicationCommandType.ChatInput;
                this.commands.set(command.data.name, command);
            }

            if (command.data.types.contextMenu) {
                switch (command.data.types?.contextMenu as number) {
                    case BotCommandContextMenuType.User:
                        command.data.type = ApplicationCommandType.User;
                        break;

                    case BotCommandContextMenuType.Message:
                        command.data.type = ApplicationCommandType.Message;
                        break;
                }

                this.commands.set(command.data.name, command);
            }
        });

        await this.registerModules(Modules.Events, (event: BotEvent<any>) =>
            this.client.on(event.data.name, (...args: any) =>
                event.execute(this, ...args)
            )
        );
    }
}
