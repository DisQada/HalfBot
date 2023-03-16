import { Client, Collection, ActivityType } from "discord.js";
import {
	BotCommand,
	BotCommandData,
	BotCommandDeployment
} from "../../entities/command";
import type { DiscordBot } from "../../core/discordBot";
import { BotInfo } from "../../main";

function getGuildId(data: BotCommandData, info?: BotInfo): string {
	let globalGuildId: string = "0";
	if (!info) {
		return globalGuildId;
	}

	switch (data.deployment) {
		case BotCommandDeployment.Global:
			return globalGuildId;

		case BotCommandDeployment.DevGuild:
			return info.devGuildId ?? globalGuildId;

		case BotCommandDeployment.SupportGuild:
			return info.supportGuildId ?? globalGuildId;

		default:
			throw new Error("Not implemented switch case: " + data.deployment);
	}
}

function finalRegistration(
	client: Client,
	commandCollection: Collection<string, BotCommandData[]>
) {
	commandCollection.forEach((commands: BotCommandData[], guildId: string) => {
		const commandsData = commands.map((command: BotCommandData) => command);

		if (guildId === "0") {
			client.application?.commands.set(commandsData);
			console.log("Registering global commands", commandsData);
		} else {
			client.guilds.cache.get(guildId)?.commands.set(commandsData);
			console.log(`Registering commands to ${guildId}`, commandsData);
		}
	});
}

function registerCommands(bot: DiscordBot): void {
	const commands: Collection<string, BotCommandData[]> = new Collection();

	bot.commands.forEach((command: BotCommand) => {
		const guildId: string = getGuildId(command.data, bot.info);

		const commandArray: BotCommandData[] = commands.get(guildId) ?? [];
		commandArray.push(command.data);
		commands.set(guildId, commandArray);
	});

	finalRegistration(bot.client, commands);
}

export default function ready(bot: DiscordBot) {
	registerCommands(bot);
	console.log(`The bot "${bot.client.user?.tag}" is online`);
	bot.client.user?.setPresence({
		status: "online",
		activities: [
			{
				name: "Operating ⚙ ...",
				type: ActivityType.Listening,
				url: "https://github.com/Discord-admins/easybot"
			}
		]
	});
}
