import type { Client } from "discord.js";
import type { BotInfo } from "..";
import type { DiscordBot } from "../core/discordBot";
import type { BotCommand, BotCommandData } from "../entities/command";

import { ActivityType, Collection } from "discord.js";
import { BotCommandDeployment } from "../entities/command";

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
        } else {
            await client.guilds.cache.get(guildId)?.commands.set(commandsData);
        }
    }
}

function registerCommands(bot: DiscordBot): void {
    const commands: Collection<string, BotCommandData[]> = new Collection();

    for (const iterator of bot.commands) {
        const command: BotCommand = iterator[1];
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
