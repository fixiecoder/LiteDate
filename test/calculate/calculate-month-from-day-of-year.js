const { assert } = require('chai');
const { calculateMonthFromDayOfYear } = require('../../src/calculate');
const testValues = require('../test-values');
const { MONTHS_INDEX } = require('../../src/constants');

describe('calculateMonthFromDayOfYear', () => {
  describe('leap years', () => {
    testValues.leap.partial.forEach(value => {
      const monthIndex = value.month - 1;
      it(`should return ${MONTHS_INDEX[monthIndex].short} month object`, () => {
        const result = calculateMonthFromDayOfYear(value.dayOfYear, true);
        const expected = MONTHS_INDEX[monthIndex];
        assert.deepEqual(result, expected);
      });
    });
  });
  describe('non leap years', () => {
    testValues.noLeap.partial.forEach(value => {
      const monthIndex = value.month - 1;
      it(`should return ${MONTHS_INDEX[monthIndex].short} month object`, () => {
        const result = calculateMonthFromDayOfYear(value.dayOfYear, false);
        const expected = MONTHS_INDEX[monthIndex];
        assert.deepEqual(result, expected);
      });
    });
  });

  it('a default value of 1 (january) is returned for any value greater than days in a year', () => {
    const result = calculateMonthFromDayOfYear(500, false);
    const expected = MONTHS_INDEX[0];
    assert.deepEqual(result, expected);
  });

  it('ensure 366 days on a leap year returns 12', () => {
    const result = calculateMonthFromDayOfYear(366, true);
    const expected = MONTHS_INDEX[11];
    assert.deepEqual(result, expected);
  });

  it('ensure 366 days on a non leap year returns 1', () => {
    const result = calculateMonthFromDayOfYear(366, false);
    const expected = MONTHS_INDEX[0];
    assert.deepEqual(result, expected);
  });

  it('ensure 365 days on a non leap year returns 12', () => {
    const result = calculateMonthFromDayOfYear(365, false);
    const expected = MONTHS_INDEX[11];
    assert.deepEqual(result, expected);
  });
});
