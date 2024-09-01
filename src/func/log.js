/** @import {FailRecord, SuccessRecord} from '../options.js' */
/** @import {TableUserConfig} from 'table' */
import { table } from 'table'

/**
 * Get the default configurations for the table.
 * @param {string} header - The name of the table.
 * @param {number} width - The width of the table rows.
 * @returns {TableUserConfig} Ready to use configurations.
 * @example
 * const finalConfig = defaultConfig('Table name')
 * @private
 */
function defaultConfig(header, width) {
  return {
    header: {
      alignment: 'center',
      content: header,
      wrapWord: false
    },
    columnDefault: {
      alignment: 'center',
      verticalAlignment: 'middle',
      wrapWord: true,
      width: width
    }
  }
}

/**
 * Log the table for successful records.
 * @param {SuccessRecord[]} records - The records to log as a table.
 * @returns {string} The table as a string.
 * @example
 * const records = [{ ... }]
 * logSuccessRecords(records)
 * @private
 */
export function logSuccessRecords(records) {
  const data = [['name', 'type', 'deployment']]

  if (records.length > 0) data.push(...records.map((r) => [r.name, r.type, r.deployment]))

  const msg = '🟩 Successful registration 🟩'
  return table(data, defaultConfig(msg, 30))
}

/**
 * Log the table for failed records.
 * @param {FailRecord[]} records - The records to log as a table.
 * @returns {string} The table as a string.
 * @example
 * const records = [{ ... }]
 * logFailRecords(records)
 * @private
 */
export function logFailRecords(records) {
  const data = [['path', 'message']]

  if (records.length > 0) data.push(...records.map((r) => [r.path, r.message]))

  const msg = '🟥 Failure registration 🟥'
  return table(data, defaultConfig(msg, 45))
}
