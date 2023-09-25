const { getGuildId } = require("../../../src/events/ready");
const { BotCommandDeployment } = require("../../../src/entities/command");

describe("Test getGuildId function", () => {
    it("should return global", () => {
        const result = getGuildId(
            {
                deployment: BotCommandDeployment.Global
            },
            {}
        );
        expect(result).toBe("0");
    });

    it("should return dev", () => {
        const result = getGuildId(
            {
                deployment: BotCommandDeployment.DevGuild
            },
            {
                dev: "dev"
            }
        );
        expect(result).toBe("dev");
    });

    it("should return support", () => {
        const result = getGuildId(
            {
                deployment: BotCommandDeployment.SupportGuild
            },
            {
                support: "support"
            }
        );
        expect(result).toBe("support");
    });

    it("should throw an error", () => {
        try {
            getGuildId(
                {
                    deployment: BotCommandDeployment.Test
                },
                {}
            );
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
        }
    });
});

// describe("Test prepareCommands function", () => {
//     it("", () => {
//         const result = prepareCommands();
//         expect(result).toBe();
//     });
// });
