import { applyStyle, asEmbed } from '../func/style'

/**
 * Handler of interactions called by the bot.
 * @param {import('../options').CommandInteraction} interaction - The interaction to handle.
 * @returns {Promise<void>}
 * @private
 */
export async function interactionCreate(interaction) {
  /**
   * A shortcut to a full reply.
   * @param {string} reply - The message to reply with.
   * @param {import('../options').Brand} brand - The brand to style the reply with.
   */
  async function quickReply(reply, brand) {
    const embed = asEmbed(reply, brand)
    const msg = {
      embeds: [embed],
      ephemeral: true
    }

    if (interaction.deferred || interaction.replied) {
      await interaction.followUp(msg)
    } else {
      await interaction.reply(msg)
    }
  }

  if (!interaction.isCommand()) {
    return
  }

  const command = interaction.bot.commands.get(interaction.commandName)
  const brand = interaction.bot.data.config.brand

  if (!command) {
    quickReply('Error: Unknown command', brand)
    return
  }

  if (command.data.defer !== false) {
    await interaction.deferReply({
      ephemeral: command.data.ephemeral
    })
  }

  let reply = await command.execute(interaction)
  if (!reply) {
    quickReply('Done', brand)
    return
  }

  if (interaction.replied) {
    return
  }

  if (typeof reply === 'string') {
    reply = {
      embeds: [asEmbed(reply, brand)]
    }
  } else {
    if (reply.embeds) {
      // @ts-expect-error
      reply.embeds = applyStyle(reply.embeds, brand)
    } else if (reply.content) {
      reply.embeds = [asEmbed(reply.content, brand)]
      delete reply.content
    }
  }

  if (interaction.deferred || interaction.replied) {
    await interaction.followUp(reply)
  } else {
    await interaction.reply(reply)
  }
}
