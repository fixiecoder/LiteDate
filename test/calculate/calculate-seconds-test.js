const { assert } = require('chai');
const { calculateSeconds } = require('../../src/calculate');
const testValues = require('../test-values');

describe('calculateSeconds', () => {
  describe('mixed values', () => {
    testValues.mixedValues.forEach(date => {
      it(`#${date.id} returns ${date.second} when given epoch ${date.epoch}`, () => {
        const result = calculateSeconds(date.epoch);
        assert.equal(result, date.second);
      });
    });
  });

  describe('leap year values', () => {
    testValues.leap.years.forEach(year => {
      testValues.leap.partial.forEach(partial => {
        it(`${partial.id} returns ${partial.second} when given epoch ${partial.value}`, () => {
          const result = calculateSeconds(year.epoch + partial.value);
          assert.equal(result, partial.second);
        });
      });
    });
  });

  describe('non leap year values', () => {
    testValues.noLeap.years.forEach(year => {
      testValues.noLeap.partial.forEach(partial => {
        it(`#${partial.id} returns ${partial.second} when given epoch ${year.epoch + partial.value}`, () => {
          const result = calculateSeconds(year.epoch + partial.value);
          assert.equal(result, partial.second);
        });
      });
    });
  });
});
