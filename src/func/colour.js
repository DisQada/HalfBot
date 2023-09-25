/**
 * @module Colour
 * @memberof Func
 */

/**
 * Get a colour as a number.
 * @param {string | number} colour - The colour value.
 * @returns {number} The colour as a number.
 * @example
 * const num = asNumber("#ffffff");
 * // num = 0xffffff
 * @example
 * const num = asNumber(0xffffff);
 * // num = 0xffffff
 */
function asNumber(colour) {
    let num;

    if (typeof colour === "number") {
        num = colour;
    } else if (typeof colour === "string") {
        num = Number.parseInt(colour.substring(1), 16);
    }

    if (num) {
        return num;
    } else {
        return 0;
    }
}

/**
 * Get a colour as a string.
 * @param {string | number} colour - The colour value.
 * @returns {string} The colour as a string.
 * @example
 * const num = asNumber("#ffffff");
 * // num = "#ffffff"
 * @example
 * const num = asNumber(0xffffff);
 * // num = "#ffffff"
 */
function asString(colour) {
    let str;

    if (typeof colour === "string") {
        str = colour.startsWith("#") ? colour.substring(1) : colour;
    } else if (typeof colour === "number") {
        str = colour.toString(16);
    }

    if (str) {
        while (str.length < 6) {
            str = "0" + str;
        }

        return `#${str}`;
    } else {
        return `#000000`;
    }
}

module.exports = {
    asNumber,
    asString
};
