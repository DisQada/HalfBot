import { expect, test } from "vitest";
import Colour from "../../dist/helpers/classes/colour";

test("Colour class initialisation with number", () => {
    let colour = new Colour(0x000000);
    expect(colour.hexNumber).toBe(0x000000);
    expect(colour.hexString).toEqual("#000000");

    colour = new Colour(0xff0000);
    expect(colour.hexNumber).toBe(0xff0000);
    expect(colour.hexString).toEqual("#ff0000");

    colour = new Colour(0x00ff00);
    expect(colour.hexNumber).toBe(0x00ff00);
    expect(colour.hexString).toEqual("#00ff00");

    colour = new Colour(0xffffff);
    expect(colour.hexNumber).toBe(0xffffff);
    expect(colour.hexString).toEqual("#ffffff");
});

test("Colour class initialisation with string", () => {
    let colour = new Colour("#000000");
    expect(colour.hexNumber).toEqual(0x000000);
    expect(colour.hexString).toEqual("#000000");

    colour = new Colour("#ff0000");
    expect(colour.hexNumber).toEqual(0xff0000);
    expect(colour.hexString).toEqual("#ff0000");

    colour = new Colour("#00ff00");
    expect(colour.hexNumber).toEqual(0x00ff00);
    expect(colour.hexString).toEqual("#00ff00");

    colour = new Colour("#ffffff");
    expect(colour.hexNumber).toEqual(0xffffff);
    expect(colour.hexString).toEqual("#ffffff");
});
