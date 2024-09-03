/** @import {Embed, Brand, StyleOptions} from '../options.js' */
import { asNumber } from './color.js'

/**
 * Convert a text to an embed.
 * @param {string} text - The original text.
 * @param {Brand} brand - The brand to style the embed with.
 * @returns {Embed} The resulting embed.
 * @example
 * const brand = { color: 0xffffff }
 * const result = asEmbed('HalfBot', brand)
 */
export function asEmbed(text, brand) {
  /** @type {Embed} */
  const embed = { description: text }
  return applyStyle(embed, brand)
}

/**
 * Apply brand style to an multiple embeds.
 * @template {Embed | Embed[]} E
 * @param {E} toApplyOn - The embeds to apply the style to.
 * @param {Brand} brand - The brand to get the style from.
 * @returns {E} The embeds array after applying the style to it.
 * @example
 * const brand = { color: 0xffffff }
 * let embed = { title: 'HalfBot' }
 * embed = applyStyle(embed, brand)
 * @example
 * const brand = { color: 0xffffff }
 * let embeds = [{ title: 'HalfBot' }]
 * embeds = applyStyle(embeds, brand)
 */
export function applyStyle(toApplyOn, brand) {
  // @ts-expect-error
  if (Array.isArray(toApplyOn)) return applyToEmbeds(toApplyOn, brand)
  // @ts-expect-error
  else return applyToEmbed(toApplyOn, brand)

  /**
   * Apply brand style to an embed.
   * @param {Embed} embed - The embed to apply the style to.
   * @param {Brand} brand - The brand to get the style from.
   * @param {StyleOptions} options - Configuration options for the process.
   * @returns {Embed} The embed after applying the style to it.
   * @example
   * const brand = { color: 0xffffff }
   * const embed = applyToEmbed({ title: 'HalfBot' }, brand)
   */
  function applyToEmbed(embed, brand, options = { skipFooter: false }) {
    if (brand.color) embed.color = asNumber(brand.color)

    if (!options.skipFooter) {
      if (brand.name) {
        if (embed.footer) embed.footer.text = brand.name
        else embed.footer = { text: brand.name }

        if (brand.logoUrl) embed.footer.iconUrl = brand.logoUrl
      }
    }

    return embed
  }

  /**
   * Apply brand style to an multiple embeds.
   * @param {Embed[]} embeds - The embeds to apply the style to.
   * @param {Brand} brand - The brand to get the style from.
   * @returns {Embed[]} The embeds array after applying the style to it.
   * @example
   * const brand = { color: 0xffffff }
   * const embeds = applyToEmbeds([{ title: 'HalfBot' }], brand)
   */
  function applyToEmbeds(embeds, brand) {
    const lastEmbed = embeds.length - 1
    for (let i = 0; i < embeds.length; i++) {
      embeds[i] = applyToEmbed(embeds[i], brand, { skipFooter: i < lastEmbed })
    }

    return embeds
  }
}
