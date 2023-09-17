function textToEmbed(text, style) {
    const embed = { description: text };
    return style ? style.applyToEmbed(embed) : embed;
}

async function interactionCreate(interaction) {
    async function quickReply(reply, style) {
        const embed = textToEmbed(reply, style);
        if (interaction.deferred || interaction.replied) {
            await interaction.followUp({
                embeds: [embed],
                ephemeral: true
            });
        } else {
            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
    }

    if (!interaction.isCommand()) {
        return;
    }

    const command = interaction.bot.commands.get(interaction.commandName);
    const style = interaction.bot?.style;

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
                    reply.embeds.map((embed) => embed)
                );
            }
        } else if (reply.content) {
            reply.embeds = [textToEmbed(reply.content, style)];
            delete reply.content;
        }
    }

    await interaction.followUp(reply);
}

module.exports = interactionCreate;
