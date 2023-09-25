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
 * Convert a text to an embed.
 * @param {string} text - The original text.
 * @param {{name:string,colour:number,logoUrl:URL}} brand - The brand to style the embed with.
 * @returns {APIEmbed} The resulting embed.
 * @private
 * @example
 * const brand = {colour: 0xffffff};
 * const result = asEmbed("halfbot", brand);
 */
function asEmbed(text, brand) {
    const embed = { description: text };
    return applyStyle(embed, brand);
}

/**
 * Apply brand style to an multiple embeds.
 * @param {APIEmbed | APIEmbed[]} toApplyOn - The embeds to apply the style to.
 * @param {{name:string,colour:number,logoUrl:URL}} brand - The brand to get the style from.
 * @returns {APIEmbed | APIEmbed[]} The embeds array after applying the style to it.
 * @example
 * let embed = {title: 'halfbot'};
 * const brand = {colour: 0xffffff};
 * embed = applyStyle(embed, brand);
 * @example
 * let embeds = [{title: 'halfbot'}];
 * const brand = {colour: 0xffffff};
 * embeds = applyStyle(embeds, brand);
 */
function applyStyle(toApplyOn, brand) {
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
            embeds[i] = applyToEmbed(embeds[i], brand, {
                skipFooter: i < lastEmbed
            });
        }

        return embeds;
    }

    if (Array.isArray(toApplyOn)) {
        return applyToEmbeds(toApplyOn, brand);
    } else {
        return applyToEmbed(toApplyOn, brand);
    }
}

module.exports = {
    asEmbed,
    applyStyle
};
