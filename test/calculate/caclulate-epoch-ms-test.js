const { assert } = require('chai');
const { caclulateEpochMS } = require('../../src/calculate');
const testValues = require('../test-values');

describe.only('caclulateEpochMS', () => {
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
        ];
        const result = caclulateEpochMS(array);
        const expect = year.epoch + partial.value;
        // console.log(result)
        assert.equal(result.epochMs, expect);
      });
    });
  });
});