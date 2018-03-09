const { assert } = require('chai');
const {
  calculateYearFromMs,
  calculatePartialYearMS,
  calculateDayOfYear,
  calculateDayOfWeek,
  caclulateEpochMS,
  calculateIsLeapYear
} = require('../src/calculate');

const lastSecondOf2017 = 1514764799000;
const lastSecondOf1980 = 347155199000;
const lastSecondOf1996 = 852076799000;
const startOf2018 = 1514764800000;
const startOf1980 = 315532800000;
const startOf1981 = 347155200000;
const startOf2020 = 1577836800000;
const afterFebInLeapYear1980 = 326073599000;
const DAY_MS = 1000 * 60 * 60 * 24;
const YEAR_MS_NO_LEAP = DAY_MS * 365;

describe('calculateYearFromMs', () => {
  it('should return the correct year when given an epoch that is midnight on the 1st of January of a year', () => {
    const expectedOne = 2018;
    const expectedTwo = 1980;
    const expectedThree = 1981;
    const expectedFour = 2020;
    const resultOne = calculateYearFromMs(startOf2018);
    const resultTwo = calculateYearFromMs(startOf1980);
    const resultThree = calculateYearFromMs(startOf1981);
    const resultFour = calculateYearFromMs(startOf2020);
    assert.equal(resultOne, expectedOne);
    assert.equal(resultTwo, expectedTwo);
    assert.equal(resultThree, expectedThree);
    assert.equal(resultFour, expectedFour);
  });

  it('should return the correct year when given an epoch that is the last second of a year', () => {
    const expectedOne = 2017;
    const expectedTwo = 1980;
    const expectedThree = 1996;
    const resultOne = calculateYearFromMs(lastSecondOf2017);
    const resultTwo = calculateYearFromMs(lastSecondOf1980);
    const resultThree = calculateYearFromMs(lastSecondOf1996);
    assert.equal(resultOne, expectedOne);
    assert.equal(resultTwo, expectedTwo);
    assert.equal(resultThree, expectedThree);
  });

  it('should return the correct year when given an epoch that is after february in a leapYear', () => {
    const expectedOne = 1980;
    const resultOne = calculateYearFromMs(afterFebInLeapYear1980);
    assert.equal(resultOne, expectedOne);
  });

  it('should return 1970 when given 0', () => {
    const expectedOne = 1970;
    const resultOne = calculateYearFromMs(0);
    assert.equal(resultOne, expectedOne);
  });
});

describe('calculatePartialYearMS', () => {
  it('should work', () => {
    const result = calculatePartialYearMS(startOf2018);
    assert.equal(result, 0);
  });

  it('should work', () => {
    const wholeYears = ((1996 - 1970) * YEAR_MS_NO_LEAP) + (DAY_MS * 7);
    const expected = lastSecondOf1996 - wholeYears;
    const result = calculatePartialYearMS(lastSecondOf1996);
    console.log('wholeYears', wholeYears);
    console.log('EXPECT', expected);
    console.log('result', result);
    assert.equal(result, expected);
  });
});
