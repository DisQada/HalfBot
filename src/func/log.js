const { table } = require("table");

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
            content: header,
            wrapWord: false
        },
        columnDefault: {
            alignment: "center",
            verticalAlignment: "middle",
            wrapWord: true,
            width: 45
        }
    };
}

/**
 * Log the table for successful records.
 * @param {SuccessRecord[]} records - The records to log as a table.
 * @returns {string} The table as a string.
 * @example
 * const records = [{ ... }];
 * logSuccessRecords(records);
 * @private
 */
function logSuccessRecords(records) {
    const data = [["name", "type", "deployment"]];

    if (records.length > 0) {
        data.push(
            ...records.map((r) => {
                return [r.name, r.type, r.deployment];
            })
        );
    }

    const msg = "🟩 Successful registration 🟩";
    return table(data, defaultConfig(msg));
}

/**
 * Log the table for failed records.
 * @param {FailRecord[]} records - The records to log as a table.
 * @returns {string} The table as a string.
 * @example
 * const records = [{ ... }];
 * logFailRecords(records);
 * @private
 */
function logFailRecords(records) {
    const data = [["path", "message"]];

    if (records.length > 0) {
        data.push(
            ...records.map((r) => {
                return [r.path, r.message];
            })
        );
    }

    const msg = "🟥 Failure registration 🟥";
    return table(data, defaultConfig(msg));
}

module.exports = {
    logSuccessRecords,
    logFailRecords
};
