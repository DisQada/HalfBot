const { asNumber } = require("./colour");

/**
 * Convert a text to an embed.
 * @param {string} text - The original text.
 * @param {{name:string,colour:number,logoUrl:URL}} brand - The brand to style the embed with.
 * @returns {import("discord.js").APIEmbed} The resulting embed.
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
 * @param {import("discord.js").APIEmbed | import("discord.js").APIEmbed[]} toApplyOn - The embeds to apply the style to.
 * @param {{name:string,colour:number,logoUrl:URL}} brand - The brand to get the style from.
 * @returns {import("discord.js").APIEmbed | import("discord.js").APIEmbed[]} The embeds array after applying the style to it.
 * @example
 * let embed = {title: 'halfbot'};
 * const brand = {colour: 0xffffff};
 * embed = applyStyle(embed, brand);
 * @example
 * let embeds = [{title: 'halfbot'}];
 * const brand = {colour: 0xffffff};
 * embeds = applyStyle(embeds, brand);
 * @category Style
 */
function applyStyle(toApplyOn, brand) {
    /**
     * Apply brand style to an embed.
     * @param {import("discord.js").APIEmbed} embed - The embed to apply the style to.
     * @param {object} brand - The brand to get the style from.
     * @param {object} options - Configuration options for the process.
     * @returns {import("discord.js").APIEmbed} The embed after applying the style to it.
     * @example
     * let embed = {title: 'HalfBot'};
     * const brand = {colour: 0xffffff};
     * embed = applyToEmbed(embed, brand);
     */
    function applyToEmbed(embed, brand, options = { skipFooter: false }) {
        if (brand.colour) {
            embed.color = asNumber(brand.colour);
        }

        if (!options.skipFooter) {
            if (brand.name) {
                if (!embed.footer) {
                    embed.footer = {};
                }
                embed.footer.text = brand.name;
            }
            if (brand.logoUrl) {
                if (!embed.footer) {
                    embed.footer = {};
                }
                embed.footer.icon_url = brand.logoUrl;
            }
        }

        return embed;
    }

    /**
     * Apply brand style to an multiple embeds.
     * @param {import("discord.js").APIEmbed[]} embeds - The embeds to apply the style to.
     * @param {object} brand - The brand to get the style from.
     * @returns {import("discord.js").APIEmbed[]} The embeds array after applying the style to it.
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

    if (!toApplyOn) {
        return;
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
