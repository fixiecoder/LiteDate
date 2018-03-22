const { assert } = require('chai');
const { calculateMonthNumberFromDayOfYear } = require('../../src/calculate');
const testValues = require('../test-values');

describe('calculateMonthNumberFromDayOfYear', () => {
  describe('leap years', () => {
    testValues.leap.partial.forEach(value => {
      it(`should return ${value.month} when given day of year ${value.dayOfYear}`, () => {
        const result = calculateMonthNumberFromDayOfYear(value.dayOfYear, true);
        assert.equal(result, value.month);
      });
    });
  });
  describe('non leap years', () => {
    testValues.noLeap.partial.forEach(value => {
      it(`should return ${value.month} when given day of year ${value.dayOfYear}`, () => {
        const result = calculateMonthNumberFromDayOfYear(value.dayOfYear, false);
        assert.equal(result, value.month);
      });
    });
  });

  it('a default value of 1 (january) is returned for any value greater than days in a year', () => {
    const result = calculateMonthNumberFromDayOfYear(500, false);
    assert.deepEqual(result, 1);
  });

  it('ensure 366 days on a leap year returns 12', () => {
    const result = calculateMonthNumberFromDayOfYear(366, true);
    assert.deepEqual(result, 12);
  });

  it('ensure 366 days on a non leap year returns 1', () => {
    const result = calculateMonthNumberFromDayOfYear(366, false);
    assert.deepEqual(result, 1);
  });

  it('ensure 365 days on a non leap year returns 12', () => {
    const result = calculateMonthNumberFromDayOfYear(365, false);
    assert.deepEqual(result, 12);
  });
});
