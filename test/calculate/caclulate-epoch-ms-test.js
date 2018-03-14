const { assert } = require('chai');
const { caclulateEpochMS } = require('../../src/calculate');
const testValues = require('../test-values');

describe('caclulateEpochMS', () => {
  describe('empty tests', () => {
    it('should return result of Date.now() when given no arguments', () => {
      const result = caclulateEpochMS();
      const expected = Date.now();
      assert.equal(result, expected);
    });

    it('should return result of Date.now() when given empty array', () => {
      const result = caclulateEpochMS([]);
      const expected = Date.now();
      assert.equal(result, expected);
    });
  });


  describe('leap years', () => {
    testValues.leap.years.forEach(year => {
      describe('when only year passed in', () => {
        it(`should return ${year.epoch} when passed only the year ${year.year}`, () => {
          const array = [
            year.year,
          ];
          const result = caclulateEpochMS(array);
          const expect = year.epoch;
          assert.equal(result.epochMs, expect);
        });
      });

      testValues.leap.partial.forEach(partial => {
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

  describe('non leap years', () => {
    testValues.noLeap.years.forEach(year => {
      describe('when only year passed in', () => {
        it(`should return ${year.epoch} when passed only the year ${year.year}`, () => {
          const array = [
            year.year,
          ];
          const result = caclulateEpochMS(array);
          const expect = year.epoch;
          assert.equal(result.epochMs, expect);
        });
      });

      testValues.noLeap.partial.forEach(partial => {
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

  describe('non leap years', () => {
    testValues.mixedValues.forEach(date => {
      it(`#${date.id} year: ${date.year}`, () => {
        const array = [
          date.year,
          date.month,
          date.date,
          date.hour,
          date.minute,
          date.second,
          date.ms || 0
        ];
        const result = caclulateEpochMS(array);
        const expect = date.epoch;
        assert.equal(result.epochMs, expect);
      });
    });
  });
});
