import {
	Client,
	Collection,
	IntentsBitField,
	Interaction,
	Partials
} from "discord.js";
import {
	getFilePath,
	getFilePathsInFolder,
	saveMainFolders
} from "paths-manager";
import type { BotCommandInteraction, BotCommand } from "../entities/command";
import type { BotEvent } from "../entities/event";
import { BotStyle, BotStyleData } from "../config/style";
import { checkData, Modules } from "./extra";
import { BotInfo, BotInfoData } from "../config/info";
import interactionCreate from "../modules/events/interactionCreate";
import ready from "../modules/events/ready";
import { config } from "dotenv";
import { BotVars } from "../main";
config();

export interface DiscordBotData {
	rootDirectory: string;
}

export class DiscordBot {
	public client: Client;
	public info: BotInfo;
	public vars: BotVars;
	public style?: BotStyle;

	public commands: Collection<string, BotCommand> = new Collection();

	public constructor(data: DiscordBotData) {
		// TODO Check token and clientId validity

		this.client = new Client({
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMessages,
				IntentsBitField.Flags.GuildMembers
			],
			partials: [Partials.GuildMember, Partials.Message]
		});

		this.info = new BotInfo({
			clientId: ""
		});

		this.vars = new BotVars({});

		saveMainFolders([data.rootDirectory]);

		this.retrieveData<BotInfoData>("info", (data) => {
			this.info = new BotInfo(data);
		});

		if (this.info.clientId === "") {
			throw new Error("Invalid client id in bot info");
		}

		this.retrieveData<Object>("vars", (data) => {
			this.vars = new BotVars(data);
		});

		this.retrieveData<BotStyleData>("style", (data) => {
			this.style = new BotStyle(data);
		});

		this.runBot();
	}

	private async runBot() {
		await this.registerAllModules();
		this.runCoreEvents();

		await this.client.login(process.env.TOKEN);
	}

	private runCoreEvents() {
		this.client.on("ready", () => ready(this));
		this.client.on("interactionCreate", (interaction: Interaction) => {
			const botInteraction: BotCommandInteraction =
				interaction as BotCommandInteraction;
			botInteraction.bot = this;
			interactionCreate(botInteraction);
		});
	}

	private retrieveData<DataType>(
		fileName: string,
		useData: (data: DataType) => void
	) {
		const filePath = getFilePath(`${fileName}.json`);
		if (filePath) {
			this.importFile(filePath).then((data: DataType) => useData(data));
		} else {
			throw new Error(`Could not find ${fileName}`);
		}
	}

	private async importFile(filePath: string) {
		const fileData = await import(filePath);
		return fileData?.default;
	}

	private async registerModules(module: Modules, callback: Function) {
		const files = getFilePathsInFolder(module);
		if (!files) throw new Error(`No files found for module: ${module}`);

		for (let i = 0; i < files.length; i++) {
			const filePath = files[i];

			if (filePath) {
				const info = await this.importFile(filePath);
				checkData(info, module, filePath, callback);
			}
		}
	}

	private async registerAllModules() {
		await this.registerModules(Modules.Commands, (command: BotCommand) =>
			this.commands.set(command.data.name, command)
		);

		await this.registerModules(Modules.Events, (event: BotEvent<any>) =>
			this.client.on(event.data.name, (...args: any) =>
				event.execute(this, ...args)
			)
		);
	}
}
