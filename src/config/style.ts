import type { APIEmbed, HexColorString } from "discord.js";
import Colour from "../helpers/classes/colour";
import Link from "../helpers/classes/link";

export interface BotStyleData {
    name: string;
    colour: number | HexColorString;
    logoUrl: string;
}

export class BotStyle {
    public name: string;
    public colour: Colour;
    public logoLink: Link;

    constructor(data: BotStyleData) {
        this.name = data.name;
        this.colour = new Colour(data.colour);
        this.logoLink = new Link(data.logoUrl);
    }

    public applyToEmbed(embed: APIEmbed, skipFooter: boolean = false) {
        embed.color = this.colour.hexNumber;

        if (!skipFooter) {
            embed.footer = {
                text: this.name,
                icon_url: this.logoLink.url
            };
        }

        return embed;
    }

    public applyToEmbeds(embeds: APIEmbed[]): typeof embeds {
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

    public applyTo(toApplyOn: APIEmbed | APIEmbed[]): typeof toApplyOn {
        if (Array.isArray(toApplyOn)) {
            return this.applyToEmbeds(toApplyOn);
        } else {
            return this.applyToEmbed(toApplyOn);
        }
    }
}
