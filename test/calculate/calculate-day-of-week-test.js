const { assert } = require('chai');
const { calculateDayOfWeek } = require('../../src/calculate');
const testValues = require('../test-values');

describe('calculateDayOfWeek', () => {
  testValues.mixedValues.forEach(date => {
    it('should pass', () => {
      const result = calculateDayOfWeek(date.epoch);
      assert.equal(result, date.dayOfWeek);
    });
  });
});
