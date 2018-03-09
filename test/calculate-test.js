const { assert } = require('chai');
const {
  calculateYearFromMs,
  calculatePartialYearMS,
  calculateDayOfYear,
  calculateDayOfWeek,
  caclulateEpochMS,
  calculateIsLeapYear
} = require('../src/calculate');

describe('calculateYearFromMs', () => {
  it('should return the correct year when given an epoch that is midnight on the 1st of January of a year', () => {
    const expectedOne = 2018;
    const expectedTwo = 1980;
    const expectedThree = 1981;
    const expectedFour = 2020;
    const testEpochMSOne = 1514764800000;
    const testEpochMSTwo = 315532800000;
    const testEpochMSThree = 347155200000;
    const testEpochMSFour = 1577836800000;
    const resultOne = calculateYearFromMs(testEpochMSOne);
    const resultTwo = calculateYearFromMs(testEpochMSTwo);
    const resultThree = calculateYearFromMs(testEpochMSThree);
    const resultFour = calculateYearFromMs(testEpochMSFour);
    assert.equal(resultOne, expectedOne);
    assert.equal(resultTwo, expectedTwo);
    assert.equal(resultThree, expectedThree);
    assert.equal(resultFour, expectedFour);
  });

  it('should return the correct year when given an epoch that is 1s before midnight on the 1st of January of a year', () => {
    const expectedOne = 2017;
    const expectedTwo = 1980;
    const expectedThree = 2017;
    const testEpochMSOne = 1514764799000;
    const testEpochMSTwo = 347155199000;
    const testEpochMSThree = 1514764799000;
    const resultOne = calculateYearFromMs(testEpochMSOne);
    const resultTwo = calculateYearFromMs(testEpochMSTwo);
    const resultThree = calculateYearFromMs(testEpochMSThree);
    assert.equal(resultOne, expectedOne);
    assert.equal(resultTwo, expectedTwo);
    assert.equal(resultThree, expectedThree);
  });
});