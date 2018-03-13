const { assert } = require('chai');
const { caclulateEpochMS } = require('../../src/calculate');
const testValues = require('../test-values');

describe.only('caclulateEpochMS', () => {
  describe.only('leap years', () => {
    testValues.leap.years.forEach(year => {
      testValues.leap.remains.forEach(partial => {
        it(`#${partial.id} year: ${year.year}`, () => {
          const array = [
            year.year,
            partial.month,
            partial.date,
            partial.hour,
            partial.minute,
            partial.second,
            partial.ms || 0
          ];
          const result = caclulateEpochMS(array);
          const expect = year.epoch + partial.value;
          assert.equal(result.epochMs, expect);
        });
      });
    });
  });

  describe.only('non leap years', () => {
    testValues.noLeap.years.forEach(year => {
      testValues.noLeap.remains.forEach(partial => {
        it(`#${partial.id} year: ${year.year}`, () => {
          const array = [
            year.year,
            partial.month,
            partial.date,
            partial.hour,
            partial.minute,
            partial.second,
            partial.ms || 0
          ];
          const result = caclulateEpochMS(array);
          const expect = year.epoch + partial.value;
          assert.equal(result.epochMs, expect);
        });
      });
    });
  });
});
