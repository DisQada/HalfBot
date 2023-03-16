import { BotVars } from "../../src/config/vars";
import { test, expect } from "vitest";

test("Vars class initialising", () => {
	const vars = new BotVars({
		aCustomValue: "This is a custom value"
	});

	expect(vars).to.be.an("object");
	expect(vars["aCustomValue"]).toEqual("This is a custom value");
});