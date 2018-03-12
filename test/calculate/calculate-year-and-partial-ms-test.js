const { assert } = require('chai');
const { calculateYearAndPartialMs } = require('../../src/calculate');
const testValues = require('../test-values');
const { prefixUnitZero } = require('../../src/methods');

describe('calculateYearAndPartialMs', () => {
  describe('leap years', () => {
    testValues.leap.years.forEach(year => {
      testValues.leap.remains.forEach(remain => {
        const r = remain.value;
        const y = year.year;
        const mo = prefixUnitZero(remain.month);
        const d = prefixUnitZero(remain.date);
        const h = prefixUnitZero(remain.hour);
        const mi = prefixUnitZero(remain.minute);
        const s = prefixUnitZero(remain.second);
        const testDescription =
          `#${remain.id} - should return remainder: ${r} and year: ${y} when given epoch for date ${y}-${mo}-${d}T${h}:${mi}:${s}`;
        it(testDescription, () => {
          const result = calculateYearAndPartialMs(year.epoch + r);
          assert.equal(result.year, y);
          assert.equal(result.partialYearMs, r);
        });
      });
    });
  });

  describe('non leap years', () => {
    testValues.noLeap.years.forEach(year => {
      testValues.noLeap.remains.forEach(remain => {
        const r = remain.value;
        const y = year.year;
        const mo = prefixUnitZero(remain.month);
        const d = prefixUnitZero(remain.date);
        const h = prefixUnitZero(remain.hour);
        const mi = prefixUnitZero(remain.minute);
        const s = prefixUnitZero(remain.second);
        it(`#${remain.id} - should return remainder: ${r} and year: ${y} when given epoch for date ${y}-${mo}-${d}T${h}:${mi}:${s}`, () => {
          const result = calculateYearAndPartialMs(year.epoch + r);
          assert.equal(result.year, y);
          assert.equal(result.partialYearMs, r);
        });
      });
    });
  });

});
