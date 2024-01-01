const { asMilliseconds, toNumber } = require('../../src/func/time')

describe('Test asMilliseconds function', () => {
  it('should be equal', () => {
    const result = asMilliseconds(10)
    expect(result).toEqual(10000)
  })
})

describe('Test toNumber function', () => {
  it('should calculate seconds only', () => {
    const result = toNumber('10s')
    expect(result).toEqual(10000)
  })

  it('should calculate minutes only', () => {
    const result = toNumber('10m')
    expect(result).toEqual(600000)
  })

  it('should calculate hours only', () => {
    const result = toNumber('10h')
    expect(result).toEqual(36000000)
  })

  it('should calculate days only', () => {
    const result = toNumber('10d')
    expect(result).toEqual(864000000)
  })

  it('should calculate sum of them', () => {
    const result = toNumber('25s14m')
    const second = 25 * 1000
    const minute = 14 * 60000
    expect(result).toEqual(second + minute)
  })

  it('should calculate all of them', () => {
    const result = toNumber('1s1m1h1d1w')
    const second = 1000
    const minute = 60000
    const hour = 3600000
    const day = 86400000
    const week = 604800000
    expect(result).toEqual(second + minute + hour + day + week)
  })

  it('should calculate all of them with mixed order', () => {
    const result = toNumber('1D1S1W1H1M')
    const second = 1000
    const minute = 60000
    const hour = 3600000
    const day = 86400000
    const week = 604800000
    expect(result).toEqual(second + minute + hour + day + week)
  })
})
