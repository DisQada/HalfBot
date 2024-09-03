/** @import {TimeUnits} from '../options.js' */

// Multipliers for time units
const ms = 1000 // Milliseconds
// const s = 1 // Seconds
const m = 60 // Minutes
const h = 60 // Hours
const d = 24 // Days
const w = 7 // Weeks

/**
 * Convert seconds to milliseconds (just multiply by 1000)
 * @param {number} seconds time to convert
 * @returns {number} time in milliseconds
 * @example
 * const milliseconds = asMilliseconds(5)
 * // milliseconds = 5000
 */
export function asMilliseconds(seconds) {
  return seconds * ms
}

/**
 * Convert string time into number (in milliseconds)
 *
 * Any number of digits can exist before the time unit,
 * at least one time unit must exist,
 * order of units does not matter
 *
 * Supported time units (case insensitive) are: s(second), m(minute), h(hour), d(day), w(week)
 * @param {string | number} str time string to convert
 * @returns {number} time in milliseconds
 * @example
 * const milliseconds = toNumber('1s1m1h1d1w')
 * // milliseconds = 694861000
 * @example
 * const milliseconds = toNumber('25m')
 * // milliseconds = 1500000
 */
export function toNumber(str) {
  if (typeof str === 'number') return asMilliseconds(str)

  let time = 0

  const sMatch = str.match(/\d+(s|S)/)
  if (sMatch) time += parseInt(sMatch[0].slice(0, -1)) * ms

  const mMatch = str.match(/\d+(m|M)/)
  if (mMatch) time += parseInt(mMatch[0].slice(0, -1)) * ms * m

  const hMatch = str.match(/\d+(h|H)/)
  if (hMatch) time += parseInt(hMatch[0].slice(0, -1)) * ms * m * h

  const dMatch = str.match(/\d+(d|D)/)
  if (dMatch) time += parseInt(dMatch[0].slice(0, -1)) * ms * m * h * d

  const wMatch = str.match(/\d+(w|W)/)
  if (wMatch) time += parseInt(wMatch[0].slice(0, -1)) * ms * m * h * d * w

  return time
}
