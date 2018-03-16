const { assert } = require('chai');
const { calculateDateFromPartialYear } = require('../../src/calculate');
const testValues = require('../test-values');

describe('calculateDateFromPartialYear', () => {
  describe('leap years', () => {
    testValues.leap.partial.forEach(partial => {
      it(`#${partial.id} should return ${partial.date} when given partial day of year ${partial.dayOfYear}`, () => {
        const result = calculateDateFromPartialYear(partial.dayOfYear, true);
        assert.equal(result, partial.date);
      });
    });
  });

  describe('non leap years', () => {
    testValues.noLeap.partial.forEach(partial => {
      it(`#${partial.id} should return ${partial.date} when given partial day of year ${partial.dayOfYear}`, () => {
        const result = calculateDateFromPartialYear(partial.dayOfYear, false);
        assert.equal(result, partial.date);
      });
    });
  });

  describe('non leap years', () => {
    testValues.noLeap.partial.forEach(partial => {
      it(`#${partial.id} should return ${partial.date} when given partial day of year ${partial.dayOfYear} no second arg`, () => {
        const result = calculateDateFromPartialYear(partial.dayOfYear);
        assert.equal(result, partial.date);
      });
    });
  });
});
