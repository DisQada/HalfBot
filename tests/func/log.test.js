const { logSuccessRecords, logFailRecords } = require("../../src/func/log");

describe("Test logSuccessfulRecords function", () => {
    it("should return string", () => {
        /** @type {import("../../src/options").SuccessRecord[]} */
        const records = [
            { name: "test1", type: "command", deployment: "global" },
            { name: "test2", type: "event", deployment: "global" }
        ];
        const result = logSuccessRecords(records);
        expect(typeof result).toEqual("string");
    });
});

describe("Test logFailedRecords function", () => {
    it("should return string", () => {
        /** @type {import("../../src/options").FailRecord[]} */
        const records = [{ path: "test1", message: "msg1" }];
        const result = logFailRecords(records);
        expect(typeof result).toEqual("string");
    });
});
