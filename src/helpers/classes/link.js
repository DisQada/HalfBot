module.exports = class Link {
    static get defaultAvatarUrl() {
        return "https://cdn.discordapp.com/embed/avatars/0.png";
    }
    static get defaultAvatarLink() {
        return new Link(this.defaultAvatarUrl);
    }

    static async getSafeDomains() {
        const safeDomains = require("../data/safeDomains");
        return safeDomains;
    }

    constructor(url) {
        // TODO Check url validity
        this.url = url;
    }
};
