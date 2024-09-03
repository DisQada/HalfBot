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
  else if (typeof color === 'string') num = parseInt(color.substring(1), 16)

  if (num) return num
  else return 0
}

/**
 * Get a color as a string.
 * @param {string | number} color - The color value.
 * @returns {string} The color as a string.
 * @example
 * const num = asString('ffffff')
 * // num = '#ffffff'
 * @example
 * const num = asString(0xffffff)
 * // num = '#ffffff'
 */
export function asString(color) {
  let str

  if (typeof color === 'string') {
    const hasHash = color.startsWith('#')

    if (hasHash && color.length === 7) return color
    str = hasHash ? color.substring(1) : color
  } else if (typeof color === 'number') str = color.toString(16)

  if (str) {
    const zeros = Array(6 - str.length)
      .fill('0')
      .join('')
    return `#${zeros + str}`
  } else return `#000000`
}
