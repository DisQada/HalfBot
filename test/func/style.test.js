const { deepEqual } = require('assert/strict')
const { applyStyle, asEmbed } = require('../../src/func/style.js')

const brand = {
  name: 'HalfBot',
  colour: 0xffffff,
  logoUrl: 'https://cdn.discordapp.com/embed/avatars/0.png'
}
const str = 'test'

describe('func', function () {
  describe('style', function () {
    describe('Test asEmbed function', function () {
      it('should return a styled embed containing the string', function () {
        const result = asEmbed(str, brand)
        deepEqual(result, {
          description: str,
          color: brand.colour,
          footer: { text: brand.name, iconUrl: brand.logoUrl }
        })
      })
    })

    describe('Test applyStyle function', function () {
      it('should return a styled embed containing the string', function () {
        const result = applyStyle({ title: str }, brand)
        deepEqual(result, {
          title: str,
          color: brand.colour,
          footer: { text: brand.name, iconUrl: brand.logoUrl }
        })
      })

      it('should return a styled embeds containing the string', function () {
        const result = applyStyle([{ title: str }, { title: str }], brand)
        deepEqual(result, [
          { title: str, color: brand.colour },
          { title: str, color: brand.colour, footer: { text: brand.name, iconUrl: brand.logoUrl } }
        ])
      })
    })
  })
})
