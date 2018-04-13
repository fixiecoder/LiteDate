const { assert } = require('chai');
const { getMsFromTimeUnit } = require('../../src/helpers');

const testValues = [
  { unit: 'NOT_A_REAL_UNIT', expected: 0, time: 1 },
  { unit: 'ms', expected: 1, time: 1 },
  { unit: 'ms', expected: 100, time: 100 },
  { unit: 'ms', expected: 999, time: 999 },
  { unit: 'ms', expected: 155556423, time: 155556423 },
  { unit: 'ms', expected: 2, time: 2 },
  { unit: 'ms', expected: 9999999999, time: 9999999999 },
  { unit: 's', expected: 10500, time: 10.5 },
  { unit: 's', expected: 11000, time: 11 },
  { unit: 's', expected: 999000, time: 999 },
  { unit: 's', expected: 1000, time: 1 },
  { unit: 's', expected: 9000, time: 9 },
  { unit: 'm', expected: 1000 * 60 * 15, time: 15 },
  { unit: 'm', expected: 1000 * 60 * 9.1, time: 9.1 },
  { unit: 'm', expected: 1000 * 60 * 1, time: 1 },
  { unit: 'm', expected: 1000 * 60 * 59.5, time: 59.5 },
  { unit: 'm', expected: 1000 * 60 * 200, time: 200 },
  { unit: 'h', expected: 1000 * 60 * 60 * 21, time: 21 },
  { unit: 'h', expected: 1000 * 60 * 60 * 17, time: 17 },
  { unit: 'h', expected: 1000 * 60 * 60 * 999, time: 999 },
  { unit: 'h', expected: 1000 * 60 * 60 * 1.2, time: 1.2 },
  { unit: 'h', expected: 1000 * 60 * 60 * 5.5, time: 5.5 },
  { unit: 'd', expected: 1000 * 60 * 60 * 24 * 1, time: 1 },
  { unit: 'd', expected: 1000 * 60 * 60 * 24 * 7, time: 7 },
  { unit: 'd', expected: 1000 * 60 * 60 * 24 * 999, time: 999 },
  { unit: 'd', expected: 1000 * 60 * 60 * 24 * 5.5, time: 5.5 },
  { unit: 'd', expected: 1000 * 60 * 60 * 24 * 3, time: 3 },
  { unit: 'w', expected: 1000 * 60 * 60 * 24 * 7 * 1, time: 1 },
  { unit: 'w', expected: 1000 * 60 * 60 * 24 * 7 * 1.5, time: 1.5 },
  { unit: 'w', expected: 1000 * 60 * 60 * 24 * 7 * 5, time: 5 },
  { unit: 'w', expected: 1000 * 60 * 60 * 24 * 7 * 52, time: 52 },
  { unit: 'w', expected: 1000 * 60 * 60 * 24 * 7 * 999, time: 999 },
];

describe('getMsFromTimeUnit', () => {
  testValues.forEach(value => {
    it(`should return ${value.expected} when given unit ${value.unit} and time ${value.time}`, () => {
      const result = getMsFromTimeUnit(value.time, value.unit);
      assert.equal(result, value.expected);
    });
  });
});
