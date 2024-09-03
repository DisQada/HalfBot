import { equal } from 'assert/strict'
import { asNumber, asString } from '../../src/func/color.js'

describe('func', function () {
  describe('color', function () {
    describe('asNumber()', function () {
      it('should return the same number', function () {
        const result = asNumber(0xffffff)
        equal(result, 0xffffff)
      })

      it('should return the number version of the color', function () {
        const result = asNumber('#ffffff')
        equal(result, 0xffffff)
      })

      it('should return full length number', function () {
        const result = asNumber(0xff)
        equal(result, 0x0000ff)
      })

      it('should return the number version of the color  in full length', function () {
        const result = asNumber('#ff')
        equal(result, 0x0000ff)
      })
    })

    describe('asString()', function () {
      it('should return the same string', function () {
        const result = asString('#ffffff')
        equal(result, '#ffffff')
      })

      it('should return the string version of the color', function () {
        const result = asString(0xffffff)
        equal(result, '#ffffff')
      })

      it('should return full length string', function () {
        const result = asString('#ff')
        equal(result, '#0000ff')
      })

      it('should return the string version of the color in full length', function () {
        const result = asString(0xff)
        equal(result, '#0000ff')
      })
    })
  })
})
