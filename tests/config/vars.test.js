const { BotVars } = require("../../src/config/vars");

test("Vars class initialising", () => {
    const vars = new BotVars({
        aCustomValue: "This is a custom value"
    });

    expect(typeof vars).toBe("object");
    expect(vars["aCustomValue"]).toEqual("This is a custom value");
});
