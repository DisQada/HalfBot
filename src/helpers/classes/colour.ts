import { HexColorString } from "discord.js";

export default class Colour {
    private hex: number;

    constructor(colour: number | HexColorString) {
        if (typeof colour === "number") {
            this.hex = colour;
        } else {
            this.hex = Number.parseInt(colour.substring(1), 16);
        }
    }

    public get hexString(): string {
        let stringNum = this.hex.toString(16);

        while (stringNum.length < 6) {
            stringNum = "0" + stringNum;
        }

        return `#${stringNum}`;
    }
    public get hexNumber(): number {
        return this.hex;
    }
}
