/** @import {BotCommand, BotEvent} from '../options.js' */

/**
 * Check a command's validity.
 * @param {BotCommand} obj - The command to check.
 * @returns {boolean} True if valid, false otherwise.
 * @private
 */
export function validCommand(obj) {
  if (!obj.execute || !obj.data || !obj.data.module || !obj.data.module.startsWith('command')) return false

  if (obj.data.module === 'command') {
    const required = ['name', 'description']
    return required.every((prop) => prop in obj.data)
  }

  return false
}

/**
 * Check an event's validity.
 * @param {BotEvent} obj - The event to check.
 * @returns {boolean} True if valid, false otherwise.
 * @private
 */
export function validEvent(obj) {
  if (!obj.execute || !obj.data || !obj.data.module || !obj.data.module.startsWith('event')) return false

  if (obj.data.module === 'event') {
    const required = ['name']
    return required.every((prop) => prop in obj.data)
  }

  if (obj.data.module === 'event-repeat') {
    const required = ['wait']
    return required.every((prop) => prop in obj.data)
  }

  return false
}
