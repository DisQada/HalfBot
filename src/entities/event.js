class BotEvent {
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

        const required = ["name"];
        const hasRequiredData = required.every(
            (property) => property in command.data
        );

        return hasRequiredData;
    }
}

module.exports = {
    BotEvent
};