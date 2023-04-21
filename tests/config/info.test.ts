import { expect, test } from "vitest";
import { BotInfo } from "../../src/config/info";

test("Info class initialising", () => {
    const info = new BotInfo({
        clientId: "1020917116041449492"
    });

    expect(info).to.be.an("object");
});
