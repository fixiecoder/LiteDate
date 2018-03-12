const { assert } = require('chai');
const { calculateYearAndRemainder } = require('../../src/calculate');
const testValues = require('../test-values');

describe('calculateYearAndRemainder', () => {
  describe('leap years', () => {
    testValues.leap.years.forEach(year => {
      testValues.leap.remains.forEach(remain => {
        const r = remain.value;
        const y = year.year;
        const mo = remain.month;
        const d = remain.date;
        const h = remain.hour;
        const mi = remain.minute;
        const s = remain.second;
        const testDescription =
          `#${remain.id} - should return remainder: ${r} and year: ${y} when given epoch for date ${y}-${mo}-${d}T${h}:${mi}:${s}`;
        it(testDescription, () => {
          const result = calculateYearAndRemainder(year.epoch + r);
          assert.equal(result.year, y);
          assert.equal(result.remainder, r);
        });
      });
    });
  });

  describe('non leap years', () => {
    testValues.noLeap.years.forEach(year => {
      testValues.noLeap.remains.forEach(remain => {
        const r = remain.value;
        const y = year.year;
        const mo = remain.month;
        const d = remain.date;
        const h = remain.hour;
        const mi = remain.minute;
        const s = remain.second;
        it(`#${remain.id} - should return remainder: ${r} and year: ${y} when given epoch for date ${y}-${mo}-${d}T${h}:${mi}:${s}`, () => {
          const result = calculateYearAndRemainder(year.epoch + r);
          assert.equal(result.year, y);
          assert.equal(result.remainder, r);
        });
      });
    });
  });

});
