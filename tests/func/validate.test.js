const { validCommand, validEvent } = require('../../src/func/validate')

describe('Test validCommand function', () => {
  it('should be valid', () => {
    /** @type {import('../../src/options').BotCommand} */
    const command = {
      // @ts-expect-error
      data: {
        name: 'test',
        description: 'testing...',
        module: 'command'
      },
      execute: () => {}
    }
    const result = validCommand(command)
    expect(result).toBeTruthy()
  })
})

describe('Test validEvent function', () => {
  it('should be valid', () => {
    /** @type {import('../../src/options').BotEvent} */
    const event = {
      data: {
        name: 'test',
        module: 'event'
      },
      execute: () => {}
    }
    const result = validEvent(event)
    expect(result).toBeTruthy()
  })
})
