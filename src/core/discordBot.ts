import {
	Client,
	Collection,
	IntentsBitField,
	Interaction,
	Partials
} from "discord.js";
import { getFilePathsInFolder, saveMainFolders } from "paths-manager";
import type { BotCommandInteraction, BotCommand } from "../entities/command";
import type { BotEvent } from "../entities/event";
import type { BotStyleData } from "../config/style";
import { checkData, Modules } from "./extra";
import ready from "../modules/events/ready";
import interactionCreate from "../modules/events/interactionCreate";

export interface DiscordBotConfig {
	token: string;
	clientId: string;
	devGuildId?: string;
	supportGuildId?: string;
	style?: BotStyleData;
	mainFolderPath?: string;
	categoryDirectionIsDown?: boolean;
}

export class DiscordBot {
	public client: Client;

	public commands: Collection<string, BotCommand> = new Collection();

	public constructor(public config: DiscordBotConfig) {
		// TODO Check token and clientId validity

		this.client = new Client({
			intents: [
				IntentsBitField.Flags.GuildMessages,
				IntentsBitField.Flags.GuildMembers
			],
			partials: [Partials.GuildMember, Partials.Message]
		});

		this.runBot(config);
	}

	private async runBot(config: DiscordBotConfig) {
		if (!config.mainFolderPath) {
			config.mainFolderPath = "bot";
		}

		saveMainFolders([
			/*"node_modules/easybot/dist",*/ config?.mainFolderPath
		]);

		await this.registerAllModules();
		this.runCoreEvents();

		await this.client.login(config.token);
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
