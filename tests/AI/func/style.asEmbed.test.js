// Date: 2023-9-24
// Author: Generated by GoCodeo.

const { asEmbed, applyStyle } = require("../../../src/func/style");

describe("asEmbed component", () => {
    describe("asEmbed function", () => {
        it("should return an embed with the given text and brand style", () => {
            const text = "halfbot";
            const brand = { colour: 0xffffff };
            const result = asEmbed(text, brand);

            expect(result).toEqual({
                description: text,
                color: brand.colour
            });
        });
    });

    describe("applyStyle function", () => {
        it("should apply brand style to a single embed", () => {
            const embed = { title: "halfbot" };
            const brand = {
                name: "test",
                colour: 0xffffff,
                logoUrl: "https://discord.com"
            };
            const result = applyStyle(embed, brand);

            expect(result).toEqual({
                title: embed.title,
                color: brand.colour,
                footer: {
                    text: brand.name,
                    icon_url: brand.logoUrl
                }
            });
        });

        it("should apply brand style to an array of embeds", () => {
            const embeds = [{ title: "halfbot" }, { title: "bot" }];
            const brand = {
                name: "test",
                colour: 0xffffff,
                logoUrl: "https://discord.com"
            };
            const result = applyStyle(embeds, brand);

            expect(result).toEqual([
                {
                    title: embeds[0].title,
                    color: brand.colour
                },
                {
                    title: embeds[1].title,
                    color: brand.colour,
                    footer: {
                        text: brand.name,
                        icon_url: brand.logoUrl
                    }
                }
            ]);
        });

        it("should skip applying the footer to the last embed in the array", () => {
            const embeds = [{ title: "halfbot" }, { title: "bot" }];
            const brand = {
                name: "test",
                colour: 0xffffff,
                logoUrl: "https://discord.com"
            };
            const result = applyStyle(embeds, brand);

            expect(result[0].footer).toBeUndefined();
            expect(result[1].footer).toBeDefined();
        });
    });
});
