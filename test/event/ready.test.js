const { equal } = require('assert/strict')
const { getGuildId } = require('../../src/events/ready.js')

describe('event', function () {
  describe('ready', function () {
    describe('getGuildId()', function () {
      it('should return global', function () {
        let result = getGuildId({ deployment: 'global' }, {})
        equal(result, '0')

        result = getGuildId({}, {})
        equal(result, '0')

        result = getGuildId({ deployment: 'test' }, {})
        equal(result, '0')
      })

      it('should return dev', function () {
        const result = getGuildId({ deployment: 'dev' }, { dev: 'dev' })
        equal(result, 'dev')
      })

      it('should return support', function () {
        const result = getGuildId({ deployment: 'support' }, { support: 'support' })
        equal(result, 'support')
      })
    })
  })
})
