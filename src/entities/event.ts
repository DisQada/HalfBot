import type { ClientEvents } from "discord.js";
import type { DiscordBot } from "../core/discordBot";

export type BotEventData<Key extends keyof ClientEvents> = {
	name: Key;
};

export type BotEventFunction<Key extends keyof ClientEvents> = (
	bot: DiscordBot,
	...args: ClientEvents[Key]
) => any;

export class BotEvent<Key extends keyof ClientEvents> {
	constructor(
		public data: BotEventData<Key>,
		public execute: BotEventFunction<Key>
	) {}
}
