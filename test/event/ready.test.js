import { equal } from 'assert/strict'
import { getGuildId } from '../../src/events/ready.js'

describe('event', function () {
  describe('ready', function () {
    describe('getGuildId()', function () {
      it('should return global', function () {
        // @ts-expect-error
        let result = getGuildId({ deployment: 'global' }, {})
        equal(result, '0')

        // @ts-expect-error
        result = getGuildId({}, {})
        equal(result, '0')

        // @ts-expect-error
        result = getGuildId({ deployment: 'test' }, {})
        equal(result, '0')
      })

      it('should return dev', function () {
        // @ts-expect-error
        const result = getGuildId({ deployment: 'dev' }, { dev: 'dev' })
        equal(result, 'dev')
      })

      it('should return support', function () {
        // @ts-expect-error
        const result = getGuildId({ deployment: 'support' }, { support: 'support' })
        equal(result, 'support')
      })
    })
  })
})
