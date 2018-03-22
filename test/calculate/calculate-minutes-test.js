const { assert } = require('chai');
const { calculateMinutes } = require('../../src/calculate');
const testValues = require('../test-values');

describe('calculateMinutes', () => {
  describe('mixed values', () => {
    testValues.mixedValues.forEach(date => {
      it(`#${date.id} returns ${date.minute} when given epoch ${date.epoch}`, () => {
        const result = calculateMinutes(date.epoch);
        assert.equal(result, date.minute);
      });
    });
  });

  describe('leap year values', () => {
    testValues.leap.years.forEach(year => {
      testValues.leap.partial.forEach(partial => {
        it(`${partial.id} returns ${partial.minute} when given epoch ${partial.value}`, () => {
          const result = calculateMinutes(year.epoch + partial.value);
          assert.equal(result, partial.minute);
        });
      });
    });
  });

  describe('non leap year values', () => {
    testValues.noLeap.years.forEach(year => {
      testValues.noLeap.partial.forEach(partial => {
        it(`#${partial.id} returns ${partial.minute} when given epoch ${year.epoch + partial.value}`, () => {
          const result = calculateMinutes(year.epoch + partial.value);
          assert.equal(result, partial.minute);
        });
      });
    });
  });
});
