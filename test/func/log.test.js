/** @import {SuccessRecord, FailRecord} from '../../src/options.js' */
import { equal } from 'assert/strict'
import { logSuccesses, logFails } from '../../src/func/log.js'

describe('Test logSuccessfulRecords function', function () {
  it('should return string', function () {
    /** @type {SuccessRecord[]} */
    const records = [
      { name: 'test1', type: 'command', deployment: 'global' },
      { name: 'test2', type: 'event', deployment: 'global' }
    ]
    const result = logSuccesses(records)

    equal(typeof result, 'string')
  })
})

describe('Test logFailedRecords function', function () {
  it('should return string', function () {
    /** @type {FailRecord[]} */
    const records = [{ path: 'test1', message: 'msg1' }]
    const result = logFails(records)

    equal(typeof result, 'string')
  })
})
