const { applyStyle, asEmbed } = require('../../src/func/style')

const brand = {
  name: 'HalfBot',
  colour: 0xffffff,
  logoUrl: 'https://cdn.discordapp.com/embed/avatars/0.png'
}
const str = 'test'

describe('Test asEmbed function', () => {
  it('should return a styled embed containing the string', () => {
    const result = asEmbed(str, brand)
    expect(result).toEqual({
      description: str,
      color: brand.colour,
      footer: {
        text: brand.name,
        iconUrl: brand.logoUrl
      }
    })
  })
})

describe('Test applyStyle function', () => {
  it('should return a styled embed containing the string', () => {
    const result = applyStyle(
      {
        title: str
      },
      brand
    )
    expect(result).toEqual({
      title: str,
      color: brand.colour,
      footer: {
        text: brand.name,
        iconUrl: brand.logoUrl
      }
    })
  })

  it('should return a styled embeds containing the string', () => {
    const result = applyStyle(
      [
        {
          title: str
        },
        {
          title: str
        }
      ],
      brand
    )
    expect(result).toEqual([
      {
        title: str,
        color: brand.colour
      },
      {
        title: str,
        color: brand.colour,
        footer: {
          text: brand.name,
          iconUrl: brand.logoUrl
        }
      }
    ])
  })
})
