/**
 * @typedef {object} BotInfoData
 * @property {string} clientId
 * @property {string} [devGuildId]
 * @property {string} [supportGuildId]
 * @interface
 */

class BotInfo {
    clientId;
    devGuildId;
    supportGuildId;

    constructor(data) {
        this.clientId = data.clientId;

        if (data.devGuildId) {
            this.devGuildId = data.devGuildId;
        }

        if (data.supportGuildId) {
            this.supportGuildId = data.supportGuildId;
        }
    }
}

module.exports = {
    BotInfo
};
