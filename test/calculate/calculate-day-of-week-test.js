const { assert } = require('chai');
const { calculateDayOfWeek } = require('../../src/calculate');
const testValues = require('../test-values');

describe('calculateDayOfWeek', () => {
  testValues.mixedValues.forEach(date => {
    it(`${date.id} returns ${date.dayOfWeek} when given epoch ${date.epoch}`, () => {
      const result = calculateDayOfWeek(date.epoch);
      assert.equal(result, date.dayOfWeek);
    });
  });
});
