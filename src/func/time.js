/**
 * Object containing multipliers for time unit
 */
const multipliers = {
  ms: 1000,
  s: 1,
  m: 60,
  h: 60,
  d: 24,
  w: 7
}

/**
 * Convert seconds to milliseconds (just multiply by 1000)
 * @param {number} seconds time to convert
 * @returns {number} time in milliseconds
 * @example
 * const milliseconds = asMilliseconds(5)
 * // milliseconds = 5000
 */
function asMilliseconds(seconds) {
  return seconds * multipliers.ms
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
function toNumber(str) {
  if (typeof str === 'number') return asMilliseconds(str)

  let time = 0

  const secondMatch = str.match(/\d+(s|S)/)
  if (secondMatch) {
    time += parseInt(secondMatch[0].slice(0, -1)) * multipliers.ms
  }

  const minuteMatch = str.match(/\d+(m|M)/)
  if (minuteMatch) {
    time +=
      parseInt(minuteMatch[0].slice(0, -1)) * multipliers.ms * multipliers.m
  }

  const hourMatch = str.match(/\d+(h|H)/)
  if (hourMatch) {
    time +=
      parseInt(hourMatch[0].slice(0, -1)) *
      multipliers.ms *
      multipliers.m *
      multipliers.h
  }

  const dayMatch = str.match(/\d+(d|D)/)
  if (dayMatch) {
    time +=
      parseInt(dayMatch[0].slice(0, -1)) *
      multipliers.ms *
      multipliers.m *
      multipliers.h *
      multipliers.d
  }

  const weekMatch = str.match(/\d+(w|W)/)
  if (weekMatch) {
    time +=
      parseInt(weekMatch[0].slice(0, -1)) *
      multipliers.ms *
      multipliers.m *
      multipliers.h *
      multipliers.d *
      multipliers.w
  }

  return time
}

// /**
//  *
//  * @param {number} value
//  * @param {import('../options').TimeUnits} from
//  * @param {import('../options').TimeUnits} to
//  */
// function convertTime(value, from, to) {}

module.exports = {
  asMilliseconds,
  toNumber
  // convertTime
}
