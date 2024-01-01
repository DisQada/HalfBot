/**
 * Check a command's validity.
 * @param {import('../options').BotCommand} obj - The command to check.
 * @returns {boolean} True if valid, false otherwise.
 * @private
 */
function validCommand(obj) {
  if (
    !obj.execute ||
    !obj.data ||
    !obj.data.module ||
    !obj.data.module.startsWith('command')
  ) {
    return false
  }

  switch (obj.data.module) {
    case 'command': {
      const required = ['name', 'description']
      return required.every((prop) => prop in obj.data)
    }

    default:
      return false
  }
}

/**
 * Check an event's validity.
 * @param {import('../options').BotEvent} obj - The event to check.
 * @returns {boolean} True if valid, false otherwise.
 * @private
 */
function validEvent(obj) {
  if (
    !obj.execute ||
    !obj.data ||
    !obj.data.module ||
    !obj.data.module.startsWith('event')
  ) {
    return false
  }

  switch (obj.data.module) {
    case 'event': {
      const required = ['name']
      return required.every((prop) => prop in obj.data)
    }

    case 'event-repeat': {
      const required = ['wait']
      return required.every((prop) => prop in obj.data)
    }

    default:
      return false
  }
}

module.exports = {
  validCommand,
  validEvent
}
