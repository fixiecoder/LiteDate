const { prefixUnitZero } = require('../../src/helpers');
const { assert } = require('chai');
const { calculateDayOfYear } = require('../../src/calculate');
const testValues = require('../test-values');

describe('calculateDayOfYear', () => {
  describe('leap years', () => {
    testValues.leap.partial.forEach(partialYear => {
      const expected = partialYear.dayOfYear;
      const y = 1970;
      const mo = prefixUnitZero(partialYear.month);
      const d = prefixUnitZero(partialYear.date);
      const h = prefixUnitZero(partialYear.hour);
      const mi = prefixUnitZero(partialYear.minute);
      const s = prefixUnitZero(partialYear.second);
      const description =
        `#${partialYear.id} - should return day of year: ${expected}, when given epoch for date ${y}-${mo}-${d}T${h}:${mi}:${s}`;
      it(description, () => {
        const result = calculateDayOfYear(true, partialYear.month, partialYear.date);
        assert.equal(result, expected);
      });
    });
  });

  describe('non leap years', () => {
    testValues.noLeap.partial.forEach(partialYear => {
      const expected = partialYear.dayOfYear;
      const y = 1970;
      const mo = prefixUnitZero(partialYear.month);
      const d = prefixUnitZero(partialYear.date);
      const h = prefixUnitZero(partialYear.hour);
      const mi = prefixUnitZero(partialYear.minute);
      const s = prefixUnitZero(partialYear.second);
      const description =
        `#${partialYear.id} - should return day of year: ${expected}, when given epoch for date ${y}-${mo}-${d}T${h}:${mi}:${s}`;
      it(description, () => {
        const result = calculateDayOfYear(false, partialYear.month, partialYear.date);
        assert.equal(result, expected);
      });
    });
  });
});
