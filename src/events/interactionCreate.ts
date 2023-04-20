import type { APIEmbed } from "discord.js";
import type { BotCommandInteraction } from "../entities/command";
import { BotStyle } from "../config/style";

function textToEmbed(text: string, style?: BotStyle): APIEmbed {
	const embed = { description: text };
	return style ? style.applyToEmbed(embed) : embed;
}

export default async function interactionCreate(
	interaction: BotCommandInteraction
) {
	async function quickReply(reply: string, style?: BotStyle) {
		await interaction.followUp({
			embeds: [textToEmbed(reply, style)],
			ephemeral: true
		});
	}

	if (!interaction.isCommand()) {
		return;
	}

	const command = interaction.bot.commands.get(interaction.commandName);
    const style = interaction.bot.style;

	if (!command) {
		quickReply("Error: Unknown command", style);
		return;
	}

	await interaction.deferReply();
	let reply = await command.execute(interaction);
	if (interaction.replied) {
		return;
	}

	if (!reply) {
		quickReply("Done", style);
		return;
	}

	if (typeof reply === "string") {
		reply = {
			embeds: [textToEmbed(reply, style)]
		};
	} else {
		if (reply.embeds) {
			if (style) {
				reply.embeds = style.applyToEmbeds(
					reply.embeds.map((embed) => embed as APIEmbed)
				);
			}
		} else if (reply.content) {
			reply.embeds = [textToEmbed(reply.content, style)];
			delete reply.content;
		}
	}

	await interaction.followUp(reply);
}
