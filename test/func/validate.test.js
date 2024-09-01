/** @import {BotCommand, BotEvent} from '../../src/options.js' */
const { ok } = require('assert/strict')
const { validCommand, validEvent } = require('../../src/func/validate.js')

describe('func', function () {
  describe('validate', function () {
    describe('validCommand()', function () {
      it('should be valid', function () {
        /** @type {BotCommand} */
        const command = {
          // @ts-ignore
          data: { name: 'test', description: 'testing...', module: 'command' },
          execute: function () {}
        }
        const result = validCommand(command)

        ok(result)
      })
    })

    describe('validEvent()', function () {
      it('should be valid', function () {
        /** @type {BotEvent} */
        const event = {
          data: { name: 'test', module: 'event' },
          execute: function () {}
        }
        const result = validEvent(event)

        ok(result)
      })
    })
  })
})
