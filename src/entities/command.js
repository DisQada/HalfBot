// eslint-disable-next-line no-unused-vars
const BotCommandDeployment = Object.freeze({
    Global: "Global",
    DevGuild: "DevGuild",
    SupportGuild: "SupportGuild"
});

// eslint-disable-next-line no-unused-vars
const BotCommandContextMenuType = Object.freeze({
    User: "User",
    Message: "Message"
});

class BotCommand {
    data;
    execute;

    constructor(data, execute) {
        this.data = data;
        this.execute = execute;
    }

    static isValid(command) {
        if (!command.data || !command.execute) {
            return false;
        }

        const required = [
            "name",
            "description",
            "deployment",
            "category",
            "types"
        ];
        const hasRequiredData = required.every(
            (property) => property in command.data
        );

        return hasRequiredData;
    }
}

module.exports = {
    BotCommand,
    BotCommandDeployment,
    BotCommandContextMenuType
};
