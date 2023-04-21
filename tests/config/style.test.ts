import { APIEmbed } from "discord.js";
import { expect, test } from "vitest";
import { BotStyle } from "../../src/config/style";

const style = new BotStyle({
    name: "halfbot",
    colour: "#00fff0",
    logoUrl: "https://github.com/DisQada/halfbot"
});

const embedTestWithNoStyle: APIEmbed = {
    title: "test"
};

const embedTestWithStyle: APIEmbed = {
    title: "test",
    color: 0x0000ff,
    footer: {
        text: "test",
        icon_url: "https://github.com"
    }
};

test("Style class initialising", () => {
    expect(style).to.be.an("object");
    expect(style.name).toEqual("halfbot");
    expect(style.colour.hexNumber).toEqual(0x00fff0);
    expect(style.colour.hexString).toEqual("#00fff0");
    expect(style.logoLink.url).toEqual("https://github.com/DisQada/halfbot");
});

test("applyToEmbed - no pre-style", () => {
    const embed = style.applyToEmbed(embedTestWithNoStyle);

    expect(embed.color).toEqual(style.colour.hexNumber);
    expect(embed.footer?.text).toEqual(style.name);
    expect(embed.footer?.icon_url).toEqual(style.logoLink.url);
});
test("applyToEmbed - pre-style", () => {
    const embed = style.applyToEmbed(embedTestWithStyle);

    expect(embed.color).toEqual(style.colour.hexNumber);
    expect(embed.footer?.text).toEqual(style.name);
    expect(embed.footer?.icon_url).toEqual(style.logoLink.url);
});

test("applyToEmbeds - no pre-style", () => {
    const embeds = style.applyToEmbeds([embedTestWithNoStyle]);

    expect(embeds[0].color).toEqual(style.colour.hexNumber);
    expect(embeds[0].footer?.text).toEqual(style.name);
    expect(embeds[0].footer?.icon_url).toEqual(style.logoLink.url);
});
test("applyToEmbeds - pre-style", () => {
    const embeds = style.applyToEmbeds([embedTestWithStyle]);

    expect(embeds[0].color).toEqual(style.colour.hexNumber);
    expect(embeds[0].footer?.text).toEqual(style.name);
    expect(embeds[0].footer?.icon_url).toEqual(style.logoLink.url);
});

test("applyTo - returning type", () => {
    const embed = style.applyTo({});
    expect(embed).to.be.an("object");

    const embeds = style.applyTo([{}]);
    expect(embeds).to.be.an("array");
    expect(embeds.length).toEqual(1);
});
