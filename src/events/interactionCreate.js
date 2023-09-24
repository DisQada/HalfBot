const { applyStyle, asEmbed } = require("../func/style");

/**
 * Handler of interactions called by the bot.
 * @param {BotCommandInteraction} interaction - The interaction to handle.
 * @returns {Promise<undefined>}
 */
async function interactionCreate(interaction) {
    /**
     * A shortcut to a full reply.
     * @param {string} reply - The message to reply with.
     * @param {object} brand - The brand to style the reply with.
     */
    async function quickReply(reply, brand) {
        const embed = asEmbed(reply, brand);
        const msg = {
            embeds: [embed],
            ephemeral: true
        };

        if (interaction.deferred || interaction.replied) {
            await interaction.followUp(msg);
        } else {
            await interaction.reply(msg);
        }
    }

    if (!interaction.isCommand()) {
        return;
    }

    const command = interaction.bot.commands.get(interaction.commandName);
    const brand = interaction.bot.data.config.brand;

    if (!command) {
        quickReply("Error: Unknown command", brand);
        return;
    }

    await interaction.deferReply();
    let reply = await command.execute(interaction);
    if (interaction.replied) {
        return;
    }

    if (!reply) {
        quickReply("Done", brand);
        return;
    }

    if (typeof reply === "string") {
        reply = {
            embeds: [asEmbed(reply, brand)]
        };
    } else {
        if (reply.embeds) {
            reply.embeds = applyStyle(
                reply.embeds.map((embed) => embed),
                brand
            );
        } else if (reply.content) {
            reply.embeds = [asEmbed(reply.content, brand)];
            delete reply.content;
        }
    }

    await interaction.followUp(reply);
}

module.exports = interactionCreate;
