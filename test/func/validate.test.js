/** @import {BotCommand, BotEvent} from '../../src/options.js' */
import { ok } from 'assert/strict'
import { validCommand, validEvent } from '../../src/func/validate.js'

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
