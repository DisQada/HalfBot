import type {
	ChatInputApplicationCommandData,
	ChatInputCommandInteraction,
	InteractionReplyOptions,
	MessageApplicationCommandData,
	MessageContextMenuCommandInteraction,
	UserApplicationCommandData,
	UserContextMenuCommandInteraction
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
	description: string;
	deployment: BotCommandDeployment;
	category: string;
	types: {
		chatInput: boolean;
		contextMenu?: BotCommandContextMenuType;
	};
} & (
	| ChatInputApplicationCommandData
	| UserApplicationCommandData
	| MessageApplicationCommandData
);

export type BotCommandInteraction = {
	bot: DiscordBot;
} & (
	| ChatInputCommandInteraction
	| UserContextMenuCommandInteraction
	| MessageContextMenuCommandInteraction
);

export type BotCommandFunction = (
	interaction: BotCommandInteraction
) => Promise<InteractionReplyOptions | string | void>;

export class BotCommand {
	constructor(
		public data: BotCommandData,
		public execute: BotCommandFunction
	) {}
}
