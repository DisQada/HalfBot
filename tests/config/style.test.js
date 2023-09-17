const { BotStyle } = require("../../src/config/style");

const style = new BotStyle({
    name: "halfbot",
    colour: "#00fff0",
    logoUrl: "https://github.com/DisQada/halfbot"
});

const embedTestWithNoStyle = {
    title: "test"
};

const embedTestWithStyle = {
    title: "test",
    color: 0x0000ff,
    footer: {
        text: "test",
        icon_url: "https://github.com"
    }
};

test("Style class initialising", () => {
    expect(typeof style).toBe("object");
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
    expect(typeof embed).toBe("object");

    const embeds = style.applyTo([{}]);
    expect(Array.isArray(embeds)).toBeTruthy();
    if (Array.isArray(embeds)) {
        expect(embeds.length).toEqual(1);
    }
});
