const { isSafe } = require("../../../src/func/url");

describe("Test isSafe function", () => {
    it("safe url", () => {
        const url = "https://discord.com";
        const result = isSafe(url);
        expect(result).toBe(true);
    });

    it("unsafe url", () => {
        const url = "https://suspecious.com";
        const result = isSafe(url);
        expect(result).toBe(false);
    });

    it("not a url", () => {
        const url = "test";
        const result = isSafe(url);
        expect(result).toBe(false);
    });
});
