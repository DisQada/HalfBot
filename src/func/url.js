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
        const parts = urlObj.hostname.split(".");

        const rootDomain =
            parts.length === 2
                ? urlObj.hostname
                : urlObj.hostname.substring(urlObj.hostname.indexOf(".") + 1);

        const trustedDomain = safeDomains.includes(rootDomain);
        const correctProtocol = urlObj.protocol.includes("http");
        return trustedDomain && correctProtocol;
    } catch (err) {
        return false;
    }
}

module.exports = {
    isSafe
};
