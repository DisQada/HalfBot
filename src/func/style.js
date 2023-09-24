/**
 * @file
 * @ignore
 */

/**
 * @module Style
 */

const { APIEmbed } = require("discord.js");
const { asNumber } = require("./colour");

/**
 * Apply brand style to an embed.
 * @param {APIEmbed} embed - The embed to apply the style to.
 * @param {object} brand - The brand to get the style from.
 * @param {object} options - Configuration options for the process.
 * @returns {APIEmbed} The embed after applying the style to it.
 * @example
 * let embed = {title: 'halfbot'};
 * const brand = {colour: 0xffffff};
 * embed = applyToEmbed(embed, brand);
 */
function applyToEmbed(embed, brand, options = { skipFooter: false }) {
    embed.color = asNumber(brand.colour);

    if (!options.skipFooter) {
        embed.footer = {
            text: brand.name,
            icon_url: brand.logoUrl
        };
    }

    return embed;
}

/**
 * Apply brand style to an multiple embeds.
 * @param {APIEmbed[]} embeds - The embeds to apply the style to.
 * @param {object} brand - The brand to get the style from.
 * @returns {APIEmbed[]} The embeds array after applying the style to it.
 * @example
 * let embeds = [{title: 'halfbot'}];
 * const brand = {colour: 0xffffff};
 * embeds = applyToEmbeds(embeds, brand);
 */
function applyToEmbeds(embeds, brand) {
    const lastEmbed = embeds.length - 1;
    for (let i = 0; i < embeds.length; i++) {
        const embed = embeds[i];

        if (embed) {
            const options = {
                skipFooter: i < lastEmbed
            };
            embeds[i] = applyToEmbed(embed, brand, options);
        }
    }

    return embeds;
}

/**
 * Apply brand style to an multiple embeds.
 * @param {APIEmbed | APIEmbed[]} embeds - The embeds to apply the style to.
 * @param {object} brand - The brand to get the style from.
 * @returns {APIEmbed | APIEmbed[]} The embeds array after applying the style to it.
 * @example
 * let embed = {title: 'halfbot'};
 * const brand = {colour: 0xffffff};
 * embed = applyTo(embed, brand);
 * @example
 * let embeds = [{title: 'halfbot'}];
 * const brand = {colour: 0xffffff};
 * embeds = applyTo(embeds, brand);
 */
function applyTo(toApplyOn, brand) {
    if (Array.isArray(toApplyOn)) {
        return this.applyToEmbeds(toApplyOn, brand);
    } else {
        return this.applyToEmbed(toApplyOn, brand);
    }
}

module.exports = {
    applyToEmbed,
    applyToEmbeds,
    applyTo
};
