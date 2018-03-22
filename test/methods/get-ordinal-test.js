const { assert } = require('chai');
const { getOrdinal } = require('../../src/methods');

const testValues = [
  { number: 1, ordinal: 'st' },
  { number: 2, ordinal: 'nd' },
  { number: 3, ordinal: 'rd' },
  { number: 4, ordinal: 'th' },
  { number: 5, ordinal: 'th' },
  { number: 6, ordinal: 'th' },
  { number: 7, ordinal: 'th' },
  { number: 8, ordinal: 'th' },
  { number: 9, ordinal: 'th' },
  { number: 10, ordinal: 'th' },
  { number: 100, ordinal: 'th' },
  { number: 101, ordinal: 'st' },
  { number: 69, ordinal: 'th' },
  { number: 23, ordinal: 'rd' },
  { number: -3, ordinal: 'rd' },
];

describe('getOrdinal', () => {
  testValues.forEach(value => {
    const expected = `${value.number}${value.ordinal}`;
    it(`should return ${expected} when given ${value.number}`, () => {
      const result = getOrdinal(value.number);
      assert.equal(result, expected);
    });
  });
});
