const { assert } = require('chai');
const { getMonthFromDayOfYear } = require('../../src/methods');
const testValues = require('../test-values');
const { MONTHS_INDEX } = require('../../src/constants');

describe('getMonthFromDayOfYear', () => {
  describe('leap years', () => {
    testValues.leap.partial.forEach(value => {
      const monthIndex = value.month - 1;
      it(`should return ${MONTHS_INDEX[monthIndex].short} month object`, () => {
        const result = getMonthFromDayOfYear(value.dayOfYear, true);
        const expected = MONTHS_INDEX[monthIndex];
        assert.deepEqual(result, expected);
      });
    });
  });
  describe('non leap years', () => {
    testValues.noLeap.partial.forEach(value => {
      const monthIndex = value.month - 1;
      it(`should return ${MONTHS_INDEX[monthIndex].short} month object`, () => {
        const result = getMonthFromDayOfYear(value.dayOfYear, true);
        const expected = MONTHS_INDEX[monthIndex];
        assert.deepEqual(result, expected);
      });
    });
  });
});
