import type { ColorResolvable } from "discord.js";

export default class Colour {
	private hex: number;

	constructor(colour: ColorResolvable) {
		this.hex = Number.parseInt(colour.toString().substring(1), 16);
	}

	public get hexString(): string {
		return `#${this.hex}`;
	}
	public get hexNumber(): number {
		return this.hex;
	}
}
