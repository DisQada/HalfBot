export interface BotInfoData {
    clientId: string;
    devGuildId?: string;
    supportGuildId?: string;
}

export class BotInfo {
    clientId: string;
    devGuildId?: string;
    supportGuildId?: string;

    constructor(data: BotInfoData) {
        this.clientId = data.clientId;

        if (data.devGuildId) {
            this.devGuildId = data.devGuildId;
        }

        if (data.supportGuildId) {
            this.supportGuildId = data.supportGuildId;
        }
    }
}
