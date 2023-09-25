/* eslint-disable jsdoc/require-example */

/**
 * @module Event
 * @memberof Entities
 */

const { Events } = require("discord.js");

/**
 * @template {Events} Key
 * @typedef {object} BotEventData
 * @property {Key} name The name of the event.
 */

/**
 * @template {Events} Key
 * @callback BotEventFunction
 * @param {DiscordBot} bot - The entire bot instance.
 * @param {...any} args
 * @returns {any}
 */

/**
 * @class
 * @template {keyof ClientEvents} Key
 */
class BotEvent {
    /** @type {BotEventData<Key>} */
    data;
    /** @type {BotEventFunction<Key>} */
    execute;

    /**
     * The initialization of a new bot event.
     * @param {BotEventData<Key>} data - The information about the event.
     * @param {BotEventFunction<Key>} execute - The function to execute the event.
     */
    constructor(data, execute) {
        this.data = data;
        this.execute = execute;
    }

    /**
     * Check an event validity.
     * @param {BotEvent<any>} event - The event to check.
     * @returns {boolean} True if valid, false otherwise.
     */
    static isValid(event) {
        if (!event.data || !event.execute) {
            return false;
        }

        const required = ["name"];
        const hasRequiredData = required.every(
            (property) => property in event.data
        );

        return hasRequiredData;
    }
}

module.exports = {
    BotEvent
};
