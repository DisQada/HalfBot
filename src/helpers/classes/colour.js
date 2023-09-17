module.exports = class Colour {
    constructor(colour) {
        if (typeof colour === "number") {
            this.hex = colour;
        } else {
            this.hex = Number.parseInt(colour.substring(1), 16);
        }
    }

    get hexString() {
        let stringNum = this.hex.toString(16);

        while (stringNum.length < 6) {
            stringNum = "0" + stringNum;
        }

        return `#${stringNum}`;
    }
    get hexNumber() {
        return this.hex;
    }
};
