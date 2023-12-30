const { getGuildId } = require("../../src/events/ready");

describe("Test getGuildId function", () => {
    it("should return global", () => {
        const result = getGuildId(
            // @ts-ignore
            {
                deployment: "global"
            },
            {}
        );
        expect(result).toBe("0");

        const result2 = getGuildId(
            // @ts-ignore
            {},
            {}
        );
        expect(result2).toBe("0");

        const result3 = getGuildId(
            {
                // @ts-ignore
                deployment: "test"
            },
            {}
        );
        expect(result3).toBe("0");
    });

    it("should return dev", () => {
        const result = getGuildId(
            // @ts-ignore
            {
                deployment: "dev"
            },
            {
                dev: "dev"
            }
        );
        expect(result).toBe("dev");
    });

    it("should return support", () => {
        const result = getGuildId(
            // @ts-ignore
            {
                deployment: "support"
            },
            {
                support: "support"
            }
        );
        expect(result).toBe("support");
    });
});
