/**
 * @file
 * @ignore
 */

/**
 * @module Colour
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
    if (typeof colour === "number") {
        return colour;
    } else {
        return Number.parseInt(colour.substring(1), 16);
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
    if (typeof colour === "string") {
        return colour;
    } else {
        let str = colour.toString(16);

        while (str.length < 6) {
            str = "0" + str;
        }

        return `#${str}`;
    }
}

module.exports = {
    asNumber,
    asString
};
