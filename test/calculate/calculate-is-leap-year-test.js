const { assert } = require('chai');
const { calculateIsLeapYear } = require('../../src/calculate');
const testValues = require('../test-values');

describe('calculateIsLeapYear', () => {
  describe('is leap year', () => {
    testValues.leap.years.forEach(year => {
      const description = `should return true when given a year value of ${year.year}`;
      it(description, () => {
        const result = calculateIsLeapYear(year.year);
        assert.isTrue(result);
      });
    });
  });
  describe('is non leap year', () => {
    testValues.noLeap.years.forEach(year => {
      const description = `should return true when given a year value of ${year.year}`;
      it(description, () => {
        const result = calculateIsLeapYear(year.year);
        assert.isFalse(result);
      });
    });
  });
});