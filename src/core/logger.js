/**
 * @module Logger
 * @private
 */

const { table } = require("table");
const { BotCommandDeployment } = require("../entities/command");
const { RecordStates } = require("../data/enums");

/**
 * Get the default configurations for the table.
 * @param {string} header - The name of the table.
 * @returns {TableUserConfig} Ready to use configurations.
 * @private
 * @example
 * const finalConfig = defaultConfig("Table name");
 */
function defaultConfig(header) {
    return {
        header: {
            alignment: "center",
            content: header
        },
        columnDefault: {
            alignment: "center",
            verticalAlignment: "middle",
            wrapWord: true
        }
    };
}

/**
 * Print the table for the records of a state.
 * @param {SuccessRecord[] | FailRecord[]} records - The records to print in a table.
 * @param {RecordStates} state - The state of the records.
 * @returns {undefined}
 * @private
 * @example
 * const records = [{ ... }];
 * debug(records, RecordStates.Success);
 */
function logRecords(records, state) {
    if (!records || records.length === 0) {
        return;
    }

    if (state === RecordStates.Success) {
        const data = [
            ["name", "type", "deployment"],
            ...records.map((r) => {
                return [
                    r.name,
                    r.type.substring(0, r.type.length - 1),
                    BotCommandDeployment[r.deployment]
                ];
            })
        ];
        const msg = "🟩 Successful registration 🟩";
        console.log(table(data, defaultConfig(msg)));
    } else {
        const data = [
            ["path", "message"],
            ...records.map((r) => {
                return [r.path, r.message];
            })
        ];
        const msg = "🟥 Failure registration 🟥";
        console.log(table(data, defaultConfig(msg)));
    }
}

/**
 * @typedef {object} SuccessRecord
 * @property {string} name The name of the bot module that was successfully registered.
 * @property {Modules} type The module type.
 * @property {BotCommandDeployment} deployment The servers deployed to.
 * @interface
 * @private
 */

/**
 * @typedef {object} FailRecord
 * @property {string} path The path of the file that failed to be registered.
 * @property {string} message Information about the failure.
 * @interface
 * @private
 */

module.exports = {
    logRecords
};
