import type {
	ChatInputApplicationCommandData,
	CommandInteraction,
	InteractionReplyOptions
} from "discord.js";
import type { DiscordBot } from "../core/discordBot";

export enum BotCommandDeployment {
	Global,
	DevGuild,
	SupportGuild
}

export enum BotCommandContextMenuType {
	User,
	Message
}

export type BotCommandData = {
	deployment: BotCommandDeployment;
	category: string;
	types: {
		chatInput: boolean;
		contextMenu?: BotCommandContextMenuType;
	};
} & ChatInputApplicationCommandData;

export interface BotCommandInteraction extends CommandInteraction {
	bot: DiscordBot;
}

export type BotCommandFunction = (
	interaction: BotCommandInteraction
) => Promise<InteractionReplyOptions | string | void>;

export class BotCommand {
	constructor(
		public data: BotCommandData,
		public execute: BotCommandFunction
	) {}
}
