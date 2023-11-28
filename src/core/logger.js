const { table } = require("table");

/**
 * State of a bot module registration
 * @typedef {"success" | "fail"} RecordType
 */

/**
 * @typedef {SuccessRecord | FailRecord} Record
 */

/**
 * @typedef {object} SuccessRecord
 * @property {string} name Name of the module
 * @property {import("../def/enums").ModuleType} type Bot module type
 * @property {import("../def/enums").DeploymentType} deployment The servers deployed to
 * @private
 */

/**
 * @typedef {object} FailRecord
 * @property {string} path Path of the file failed to be registered
 * @property {string} message Information about the failure
 * @private
 */

/**
 * Get the default configurations for the table.
 * @param {string} header - The name of the table.
 * @returns {import("table").TableUserConfig} Ready to use configurations.
 * @example
 * const finalConfig = defaultConfig("Table name");
 * @private
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
 * @param {Record[]} records - The records to print in a table.
 * @param {RecordType} state - The state of the records.
 * @returns {void}
 * @example
 * const records = [{ ... }];
 * debug(records, RecordStates.Success);
 * @private
 */
function logRecords(records, state) {
    if (!records || records.length === 0) {
        return;
    }

    if (state === "success") {
        const data = [
            ["name", "type", "deployment"],
            ...records.map((/** @type {SuccessRecord} */ r) => {
                return [r.name, r.type, r.deployment];
            })
        ];
        const msg = "🟩 Successful registration 🟩";
        console.log(table(data, defaultConfig(msg)));
    } else {
        const data = [
            ["path", "message"],
            ...records.map((/** @type {FailRecord} */ r) => {
                return [r.path, r.message];
            })
        ];
        const msg = "🟥 Failure registration 🟥";
        console.log(table(data, defaultConfig(msg)));
    }
}

module.exports = {
    logRecords
};
