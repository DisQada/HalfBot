const { equal } = require('assert/strict')
const { asMilliseconds, toNumber } = require('../../src/func/time.js')

describe('func', function () {
  describe('time', function () {
    describe('asMilliseconds()', function () {
      it('should be equal', function () {
        const result = asMilliseconds(10)
        equal(result, 10000)
      })
    })

    describe('toNumber()', function () {
      it('should calculate seconds only', function () {
        const result = toNumber('10s')
        equal(result, 10000)
      })

      it('should calculate minutes only', function () {
        const result = toNumber('10m')
        equal(result, 600000)
      })

      it('should calculate hours only', function () {
        const result = toNumber('10h')
        equal(result, 36000000)
      })

      it('should calculate days only', function () {
        const result = toNumber('10d')
        equal(result, 864000000)
      })

      it('should calculate sum of them', function () {
        const result = toNumber('25s14m')
        const second = 25 * 1000
        const minute = 14 * 60000
        equal(result, second + minute)
      })

      it('should calculate all of them', function () {
        const result = toNumber('1s1m1h1d1w')
        const second = 1000
        const minute = 60000
        const hour = 3600000
        const day = 86400000
        const week = 604800000
        equal(result, second + minute + hour + day + week)
      })

      it('should calculate all of them with mixed order', function () {
        const result = toNumber('1D1S1W1H1M')
        const second = 1000
        const minute = 60000
        const hour = 3600000
        const day = 86400000
        const week = 604800000
        equal(result, second + minute + hour + day + week)
      })
    })
  })
})
