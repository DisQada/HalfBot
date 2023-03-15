import { BotInfo } from "../../src/config/info";
import { test, expect } from "vitest";

test("Info class initialising", () => {
	const info = new BotInfo({
		clientId: "1020917116041449492"
	});

	expect(info).to.be.an("object");
});
