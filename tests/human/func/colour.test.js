const { asNumber, asString } = require("../../../src/func/colour");

describe("Test asNumber function", () => {
    it("should return the same number", () => {
        const result = asNumber(0xffffff);
        expect(result).toBe(0xffffff);
    });

    it("should return the number version of the colour", () => {
        const result = asNumber("#ffffff");
        expect(result).toBe(0xffffff);
    });

    it("should return full length number", () => {
        const result = asNumber(0xff);
        expect(result).toBe(0x0000ff);
    });

    it("should return the number version of the colour  in full length", () => {
        const result = asNumber("#ff");
        expect(result).toBe(0x0000ff);
    });
});

describe("Test asString function", () => {
    it("should return the same string", () => {
        const result = asString("#ffffff");
        expect(result).toBe("#ffffff");
    });

    it("should return the string version of the colour", () => {
        const result = asString(0xffffff);
        expect(result).toBe("#ffffff");
    });

    it("should return full length string", () => {
        const result = asString("#ff");
        expect(result).toBe("#0000ff");
    });

    it("should return the string version of the colour in full length", () => {
        const result = asString(0xff);
        expect(result).toBe("#0000ff");
    });
});
