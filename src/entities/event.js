/**
 *
 * @template {keyof import("discord.js").ClientEvents} Key
 * @typedef {object} EventData
 * @prop {Key} name Event name / caller
 * @prop {"event"} module Bot module type
 */

/**
 *
 * @template {keyof import("discord.js").ClientEvents} Key
 * @callback EventFunction
 * @param {import("../core/discordBot").DiscordBot} bot
 * @param {...import("discord.js").ClientEvents[Key]} args
 * @return {any}
 */

/**
 * @class
 * @category Modules
 * @template {keyof import("discord.js").ClientEvents} Key
 */
class BotEvent {
    /** @type {EventData<Key>} */
    data;
    /** @type {EventFunction<Key>} */
    execute;

    /**
     * The initialization of a new bot event.
     * @param {EventData<Key>} data - The information about the event.
     * @param {EventFunction<Key>} execute - The function to execute the event.
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
    BotEvent,
    EventData,
    EventFunction
};
