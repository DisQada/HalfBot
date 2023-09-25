/**
 * @module Enums
 * @private
 */

/**
 * The types of bot modules.
 * @enum {string}
 * @property {"commands"} Commands
 * @property {"events"} Events
 * @property {"modals"} Modals
 * @private
 */
const Modules = Object.freeze({
    Commands: "commands",
    Events: "events",
    Modals: "modals"
});

/**
 * The state of a bot module registration.
 * @enum {number}
 * @property {0} Success
 * @property {1} Fail
 * @private
 */
const RecordStates = Object.freeze({
    Success: 0,
    Fail: 1
});

module.exports = {
    Modules,
    RecordStates
};
