const { BotInfo } = require("../../src/config/info");

test("Info class initialising", () => {
    const info = new BotInfo({
        clientId: "1020917116041449492"
    });

    expect(typeof info).toBe("object");
});
