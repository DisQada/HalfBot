import type { APIEmbed } from "discord.js";
import type { BotCommandInteraction } from "../../entities/command";
import { BotStyle } from "../../config/style";

function textToEmbed(text: string, style?: BotStyle): APIEmbed {
	if (style) {
		return style.applyToEmbed({
			description: text
		});
	} else {
		return {
			description: text
		};
	}
}

export default async function interactionCreate(
	interaction: BotCommandInteraction
) {
	function quickReply(reply: string, style: BotStyle) {
		interaction.followUp({
			embeds: [textToEmbed(reply, style)],
			ephemeral: true
		});
	}

	if (interaction.isCommand()) {
		const style: BotStyle = new BotStyle(interaction.bot.config.style);
		const command = interaction.bot.commands.get(interaction.commandName);

		if (!command) {
			quickReply("Error: Unknown command", style);
			return;
		}

		await interaction.deferReply();
		let reply = await command.execute(interaction);
		if (!reply) {
			quickReply("Done :)", style);
			return;
		}

		if (typeof reply === "string") {
			reply = {
				embeds: [textToEmbed(reply, style)]
			};
		} else {
			if (reply.embeds) {
				reply.embeds = style.applyToEmbeds(
					reply.embeds.map((embed) => embed as APIEmbed)
				);
			} else if (reply.content) {
				reply.embeds = [textToEmbed(reply.content, style)];
				delete reply.content;
			}
		}

		interaction.followUp(reply);
	}
}
