const { asNumber } = require('./colour')

/**
 * Convert a text to an embed.
 * @param {string} text - The original text.
 * @param {import('../options').Brand} brand - The brand to style the embed with.
 * @returns {import('../options').Embed} The resulting embed.
 * @example
 * const brand = { colour: 0xffffff }
 * const result = asEmbed('HalfBot', brand)
 */
function asEmbed(text, brand) {
  /** @type {import('../options').Embed} */
  const embed = { description: text }
  // @ts-expect-error
  return applyStyle(embed, brand)
}

/**
 * Apply brand style to an multiple embeds.
 * @param {import('../options').Embed | import('../options').Embed[]} toApplyOn - The embeds to apply the style to.
 * @param {import('../options').Brand} brand - The brand to get the style from.
 * @returns {import('../options').Embed | import('../options').Embed[]} The embeds array after applying the style to it.
 * @example
 * let embed = { title: 'HalfBot' }
 * const brand = { colour: 0xffffff }
 * embed = applyStyle(embed, brand)
 * @example
 * let embeds = [{ title: 'HalfBot' }]
 * const brand = { colour: 0xffffff }
 * embeds = applyStyle(embeds, brand)
 */
function applyStyle(toApplyOn, brand) {
  if (Array.isArray(toApplyOn)) {
    return applyToEmbeds(toApplyOn, brand)
  } else {
    return applyToEmbed(toApplyOn, brand)
  }

  /**
   * Apply brand style to an embed.
   * @param {import('../options').Embed} embed - The embed to apply the style to.
   * @param {import('../options').Brand} brand - The brand to get the style from.
   * @param {import('../options').StyleOptions} options - Configuration options for the process.
   * @returns {import('../options').Embed} The embed after applying the style to it.
   * @example
   * let embed = { title: 'HalfBot' }
   * const brand = { colour: 0xffffff }
   * embed = applyToEmbed(embed, brand)
   */
  function applyToEmbed(embed, brand, options = { skipFooter: false }) {
    if (brand.colour) {
      embed.color = asNumber(brand.colour)
    }

    if (!options.skipFooter) {
      if (brand.name) {
        if (embed.footer) {
          embed.footer.text = brand.name
        } else {
          embed.footer = { text: brand.name }
        }

        if (brand.logoUrl) {
          embed.footer.iconUrl = brand.logoUrl
        }
      }
    }

    return embed
  }

  /**
   * Apply brand style to an multiple embeds.
   * @param {import('../options').Embed[]} embeds - The embeds to apply the style to.
   * @param {import('../options').Brand} brand - The brand to get the style from.
   * @returns {import('../options').Embed[]} The embeds array after applying the style to it.
   * @example
   * let embeds = [{ title: 'HalfBot' }]
   * const brand = { colour: 0xffffff }
   * embeds = applyToEmbeds(embeds, brand)
   */
  function applyToEmbeds(embeds, brand) {
    const lastEmbed = embeds.length - 1
    for (let i = 0; i < embeds.length; i++) {
      embeds[i] = applyToEmbed(embeds[i], brand, {
        skipFooter: i < lastEmbed
      })
    }

    return embeds
  }
}

module.exports = {
  asEmbed,
  applyStyle
}
