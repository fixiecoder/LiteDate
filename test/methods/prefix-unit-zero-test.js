const { assert } = require('chai');
const { prefixUnitZero } = require('../../src/methods');

const testValues = [
  { number: 1, expected: '01' },
  { number: 2, expected: '02' },
  { number: 3, expected: '03' },
  { number: 4, expected: '04' },
  { number: 5, expected: '05' },
  { number: 6, expected: '06' },
  { number: 7, expected: '07' },
  { number: 8, expected: '08' },
  { number: 9, expected: '09' },
  { number: 10, expected: '10' },
  { number: 11, expected: '11' },
  { number: 12, expected: '12' },
  { number: 13, expected: '13' },
  { number: 14, expected: '14' },
  { number: 8563729, expected: '8563729' },
  { number: -0, expected: '00' },
  { number: -1, expected: '-01' },
  { number: -2, expected: '-02' },
  { number: -3, expected: '-03' },
  { number: -4, expected: '-04' },
  { number: -5, expected: '-05' },
  { number: -6, expected: '-06' },
  { number: -6, expected: '-06' },
  { number: -7, expected: '-07' },
  { number: -8, expected: '-08' },
  { number: -9, expected: '-09' },
  { number: -10, expected: '-10' },
  { number: -11, expected: '-11' },
  { number: -12, expected: '-12' },
  { number: -19275, expected: '-19275' },
];

describe('prefixUnitZero', () => {
  testValues.forEach(value => {
    it(`should return ${value.expected} when given ${value.number}`, () => {
      const result = prefixUnitZero(value.number);
      assert.equal(result, value.expected);
    });
  });
});
