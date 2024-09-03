import { equal } from 'assert/strict'
import { getGuildId, prepareCommands } from '../../src/events/ready.js'

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

    describe('prepareCommands()', function () {
      it('should return an empty map when there are no commands', function () {
        const bot = { commands: new Map(), data: { id: { guild: {} } } }
        // @ts-expect-error
        const result = prepareCommands(bot)
        equal(result.size, 0)
      })

      it('should correctly prepare global commands', function () {
        const bot = {
          commands: new Map([['cmd1', { data: { deployment: 'global' } }]]),
          data: { id: { guild: {} } }
        }
        // @ts-expect-error
        const result = prepareCommands(bot)

        equal(result.size, 1)
        equal(result.get('0')?.length, 1)
        equal(result.get('0')?.[0].deployment, 'global')
      })

      it('should correctly prepare dev commands', function () {
        const bot = {
          commands: new Map([['cmd1', { data: { deployment: 'dev' } }]]),
          data: { id: { guild: { dev: 'devGuildId' } } }
        }
        // @ts-expect-error
        const result = prepareCommands(bot)

        equal(result.size, 1)
        equal(result.get('devGuildId')?.length, 1)
        equal(result.get('devGuildId')?.[0].deployment, 'dev')
      })

      it('should correctly prepare support commands', function () {
        const bot = {
          commands: new Map([['cmd1', { data: { deployment: 'support' } }]]),
          data: { id: { guild: { support: 'supportGuildId' } } }
        }
        // @ts-expect-error
        const result = prepareCommands(bot)

        equal(result.size, 1)
        equal(result.get('supportGuildId')?.length, 1)
        equal(result.get('supportGuildId')?.[0].deployment, 'support')
      })

      it('should correctly prepare mixed commands', function () {
        const bot = {
          commands: new Map([
            ['cmd1', { data: { deployment: 'global' } }],
            ['cmd2', { data: { deployment: 'dev' } }],
            ['cmd3', { data: { deployment: 'support' } }]
          ]),
          data: { id: { guild: { dev: 'devGuildId', support: 'supportGuildId' } } }
        }
        // @ts-expect-error
        const result = prepareCommands(bot)

        equal(result.size, 3)
        equal(result.get('0')?.length, 1)
        equal(result.get('0')?.[0].deployment, 'global')
        equal(result.get('devGuildId')?.length, 1)
        equal(result.get('devGuildId')?.[0].deployment, 'dev')
        equal(result.get('supportGuildId')?.length, 1)
        equal(result.get('supportGuildId')?.[0].deployment, 'support')
      })
    })
  })
})
