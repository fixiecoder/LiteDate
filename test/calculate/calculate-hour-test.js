const { assert } = require('chai');
const { calculateHour } = require('../../src/calculate');
const testValues = require('../test-values');

describe('calculateHour', () => {
  describe('mixed values', () => {
    testValues.mixedValues.forEach(date => {
      it(`${date.id} returns ${date.hour} when given epoch ${date.epoch}`, () => {
        const result = calculateHour(date.epoch);
        assert.equal(result, date.hour);
      });
    });
  });

  // describe('leap year values', () => {
  //   testValues.leap.years.forEach(year => {
  //     testValues.leap.partial.forEach(partial => {
  //       it(`${partial.id} returns ${partial.hour} when given epoch ${partial.value}`, () => {
  //         const result = calculateHour(year.epoch + partial.value);
  //         assert.equal(result, partial.hour);
  //       });
  //     });
  //   });
  // });

  describe.only('non leap year values', () => {
    testValues.noLeap.years.forEach(year => {
      testValues.noLeap.partial.forEach(partial => {
        it(`${partial.id} returns ${partial.hour} when given epoch ${partial.value}`, () => {
          const result = calculateHour(year.epoch + partial.value);
          assert.equal(result, partial.hour);
        });
      });
    });
  });
});
