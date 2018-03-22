const { assert } = require('chai');
const { getMonthFromNumber } = require('../../src/helpers');
const { MONTHS_INDEX } = require('../../src/constants');

const testValues = [
  { number: 1, expected: MONTHS_INDEX[0] },
  { number: 2, expected: MONTHS_INDEX[1] },
  { number: 3, expected: MONTHS_INDEX[2] },
  { number: 4, expected: MONTHS_INDEX[3] },
  { number: 5, expected: MONTHS_INDEX[4] },
  { number: 6, expected: MONTHS_INDEX[5] },
  { number: 7, expected: MONTHS_INDEX[6] },
  { number: 8, expected: MONTHS_INDEX[7] },
  { number: 9, expected: MONTHS_INDEX[8] },
  { number: 10, expected: MONTHS_INDEX[9] },
  { number: 11, expected: MONTHS_INDEX[10] },
  { number: 12, expected: MONTHS_INDEX[11] },
];

describe('getMonthFromNumber', () => {
  testValues.forEach(value => {
    it(`should return month object for ${value.expected.short} when given ${value.number}`, () => {
      const result = getMonthFromNumber(value.number);
      assert.deepEqual(result, value.expected);
    });
  });

  it('errors when given 0 month number', () => {
    assert.throws(() => getMonthFromNumber(0), Error);
  });
  it('errors when given 13 month number', () => {
    assert.throws(() => getMonthFromNumber(13), Error);
  });
});
