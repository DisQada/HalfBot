/**
 * @file
 * @ignore
 */

/**
 * @module Url
 */

/**
 * Check the safety of an url.
 * @param {string} url - The url to check.
 * @returns {boolean} True if it's safe, false otherwise.
 * @example
 * if (isSafe("https://discord.com")) { ... }
 */
function isSafe(url) {
    const safeDomains = require("../data/safeDomains");
    try {
        const urlObj = new URL(url);
        return safeDomains.includes(urlObj.hostname);
    } catch (err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    isSafe
};
