const { assert } = require('chai');
const { calculateYearAndPartialMs } = require('../../src/calculate');
const testValues = require('../test-values');
const { prefixUnitZero } = require('../../src/helpers');

describe('calculateYearAndPartialMs', () => {
  describe('leap years', () => {
    testValues.leap.years.forEach(year => {
      testValues.leap.partial.forEach(remain => {
        const r = remain.value;
        const y = year.year;
        const mo = prefixUnitZero(remain.month);
        const d = prefixUnitZero(remain.date);
        const h = prefixUnitZero(remain.hour);
        const mi = prefixUnitZero(remain.minute);
        const s = prefixUnitZero(remain.second);
        const ms = remain.ms ? prefixUnitZero(remain.ms) : 0;
        const testDescription =
          `#${remain.id} - should return remainder: ${r} and year: ${y} when given epoch for date ${y}-${mo}-${d}T${h}:${mi}:${s}.${ms}`;
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
      testValues.noLeap.partial.forEach(remain => {
        const r = remain.value;
        const y = year.year;
        const mo = prefixUnitZero(remain.month);
        const d = prefixUnitZero(remain.date);
        const h = prefixUnitZero(remain.hour);
        const mi = prefixUnitZero(remain.minute);
        const s = prefixUnitZero(remain.second);
        const ms = remain.ms ? prefixUnitZero(remain.ms) : 0;
        it(`#${remain.id} - should return remainder: ${r} and year: ${y} when given epoch for date ${y}-${mo}-${d}T${h}:${mi}:${s}.${ms}`, () => {
          const result = calculateYearAndPartialMs(year.epoch + r);
          assert.equal(result.year, y);
          assert.equal(result.partialYearMs, r);
        });
      });
    });
  });

});
