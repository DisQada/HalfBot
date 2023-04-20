import Link from "../helpers/classes/link";

export interface BotInfoData {
    id: {
        client: string;
        guild: {
            support: string;
            development: string;
        };
        channel: {
            welcome?: string;
            errorLog?: string;
        };
        role: {};
    };
    links: {
        website?: Link;
    };
    vars: Object;
}

export class BotInfo {
    id: {
        client: string;
        guild: {
            support: string;
            development: string;
        };
        channel: {
            welcome?: string;
            errorLog?: string;
        };
    };
    links: {
        website?: Link;
    };
    vars: Object;

    constructor(data: BotInfoData) {
        this.id = data.id;
        this.links = data.links;
        this.vars = data.vars;
    }
}
