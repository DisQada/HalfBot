/**
 * Get a color as a number.
 * @param {string | number} color - The color value.
 * @returns {number} The color as a number.
 * @example
 * const num = asNumber('#ffffff')
 * // num = 0xffffff
 * @example
 * const num = asNumber(0xffffff)
 * // num = 0xffffff
 */
export function asNumber(color) {
  let num

  if (typeof color === 'number') num = color
  else if (typeof color === 'string') num = Number.parseInt(color.substring(1), 16)

  if (num) return num
  else return 0
}

/**
 * Get a color as a string.
 * @param {string | number} color - The color value.
 * @returns {string} The color as a string.
 * @example
 * const num = asNumber('#ffffff')
 * // num = '#ffffff'
 * @example
 * const num = asNumber(0xffffff)
 * // num = '#ffffff'
 */
export function asString(color) {
  let str

  if (typeof color === 'string') str = color.startsWith('#') ? color.substring(1) : color
  else if (typeof color === 'number') str = color.toString(16)

  if (str) {
    while (str.length < 6) str = '0' + str
    return `#${str}`
  } else return `#000000`
}
