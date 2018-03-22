const { assert } = require('chai');
const { getMonthNumberFromDayOfYear } = require('../../src/methods');
const testValues = require('../test-values');

describe('getMonthNumberFromDayOfYear', () => {
  describe('leap years', () => {
    testValues.leap.partial.forEach(value => {
      it(`should return ${value.month} when given day of year ${value.dayOfYear}`, () => {
        const result = getMonthNumberFromDayOfYear(value.dayOfYear, true);
        assert.deepEqual(result, value.month);
      });
    });
  });
  describe('non leap years', () => {
    testValues.noLeap.partial.forEach(value => {
      it(`should return ${value.month} when given day of year ${value.dayOfYear}`, () => {
        const result = getMonthNumberFromDayOfYear(value.dayOfYear, true);
        assert.deepEqual(result, value.month);
      });
    });
  });
});
