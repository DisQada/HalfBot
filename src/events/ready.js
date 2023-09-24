const { ActivityType, Collection } = require("discord.js");
const { BotCommandDeployment } = require("../entities/command");

function getGuildId(data, config) {
    const globalGuildId = "0";
    if (!config) {
        return globalGuildId;
    }

    switch (data.deployment) {
        case BotCommandDeployment.Global:
            return globalGuildId;

        case BotCommandDeployment.DevGuild:
            return config.id.guild.dev ?? globalGuildId;

        case BotCommandDeployment.SupportGuild:
            return config.id.guild.support ?? globalGuildId;

        default:
            throw new Error(
                "Unknown BotCommandDeployment value: " + data.deployment
            );
    }
}

async function finalRegistration(client, commandCollection) {
    for (const iterator of commandCollection) {
        const guildId = iterator[0];
        const commandsData = iterator[1];

        if (guildId === "0") {
            await client.application?.commands.set(commandsData);
        } else {
            await client.guilds.cache.get(guildId)?.commands.set(commandsData);
        }
    }
}

function registerCommands(bot) {
    const commands = new Collection();

    for (const iterator of bot.commands) {
        const command = iterator[1];
        const guildId = getGuildId(command.data, bot.config);

        const commandArray = commands.get(guildId) ?? [];
        commandArray.push(command.data);
        commands.set(guildId, commandArray);
    }

    finalRegistration(bot.client, commands);
}

function ready(bot) {
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

module.exports = ready;
