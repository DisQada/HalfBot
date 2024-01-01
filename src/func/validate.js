/**
 * Check a command's validity.
 * @param {import('../options').BotCommand} obj - The command to check.
 * @returns {boolean} True if valid, false otherwise.
 * @category Validate
 * @private
 */
function validCommand(obj) {
  if (
    !obj.data ||
    !obj.data.module ||
    obj.data.module !== 'command' ||
    !obj.execute
  ) {
    return false
  }

  const required = ['name', 'description']
  const hasRequiredData = required.every((property) => property in obj.data)

  return hasRequiredData
}

/**
 * Check an event's validity.
 * @param {import('../options').BotEvent} obj - The event to check.
 * @returns {boolean} True if valid, false otherwise.
 * @category Validate
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
    !obj.data ||
    !obj.data.module ||
    obj.data.module !== 'event' ||
    !obj.execute
  ) {
    return false
  }

  const required = ['name']
  const hasRequiredData = required.every((property) => property in obj.data)

  return hasRequiredData
}

module.exports = {
  validCommand,
  validEvent
}
