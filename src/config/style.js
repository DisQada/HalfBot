const Colour = require("../helpers/classes/colour");
const Link = require("../helpers/classes/link");

class BotStyle {
    name;
    colour;
    logoLink;

    constructor(data) {
        this.name = data?.name ?? "Easy bot";
        this.colour = new Colour(data?.colour ?? 0xffffff);
        this.logoLink = new Link(data?.logoUrl ?? Link.defaultAvatarUrl);
    }

    applyToEmbed(embed, skipFooter = false) {
        embed.color = this.colour.hexNumber;

        if (!skipFooter) {
            embed.footer = {
                text: this.name,
                icon_url: this.logoLink.url
            };
        }

        return embed;
    }

    applyToEmbeds(embeds) {
        const lastEmbed = embeds.length - 1;
        for (let i = 0; i < embeds.length; i++) {
            const embed = embeds[i];

            if (embed) {
                const skipFooter = i < lastEmbed;
                embeds[i] = this.applyToEmbed(embed, skipFooter);
            }
        }

        return embeds;
    }

    applyTo(toApplyOn) {
        if (Array.isArray(toApplyOn)) {
            return this.applyToEmbeds(toApplyOn);
        } else {
            return this.applyToEmbed(toApplyOn);
        }
    }
}

module.exports = {
    BotStyle
};
