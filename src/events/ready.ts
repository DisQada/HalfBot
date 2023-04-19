import { Client, Collection, ActivityType } from "discord.js";
import { BotCommandData, BotCommandDeployment } from "../entities/command";
import type { DiscordBot } from "../core/discordBot";
import { BotInfo } from "..";

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
			throw new Error(
				"Unknown BotCommandDeployment value: " + data.deployment
			);
	}
}

async function finalRegistration(
	client: Client,
	commandCollection: Collection<string, BotCommandData[]>
) {
	for (const iterator of commandCollection) {
		const guildId: string = iterator[0];
		const commandsData: BotCommandData[] = iterator[1];

		if (guildId === "0") {
			await client.application?.commands.set(commandsData);
			console.log(
				"Registered global commands: ",
				commandsData.map((data: BotCommandData) => {
					data.name;
				})
			);
		} else {
			await client.guilds.cache.get(guildId)?.commands.set(commandsData);
			console.log(
				`Registered commands to ${guildId}: `,
				commandsData.map((data: BotCommandData) => {
					data.name;
				})
			);
		}
	}
}

function registerCommands(bot: DiscordBot): void {
	const commands: Collection<string, BotCommandData[]> = new Collection();

	for (const iterator of bot.commands) {
		const command = iterator[1];
		const guildId: string = getGuildId(command.data, bot.info);

		const commandArray: BotCommandData[] = commands.get(guildId) ?? [];
		commandArray.push(command.data);
		commands.set(guildId, commandArray);
	}

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
				url: "https://github.com/DisQada/halfbot"
			}
		]
	});
}
