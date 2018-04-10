const { assert } = require('chai');
const UTCDate = require('../../src/index');
const { prefixUnitZero, getOrdinal } = require('../../src/helpers');
const testValues = require('../test-values');
const { MONTHS_INDEX } = require('../../src/constants');

/*

  YYYY      2014  4 or 2 digit year
  YY        14  2 digit year
  M MM      1..12 Month number
  MMM MMMM  Jan..December Month name in locale set by moment.locale()
  ddd dddd  Mon...Sunday  Day name in locale set by
  D DD      1..31 Day of month
  Do        1st..31st Day of month with ordinal
  X         1410715640.579  Unix timestamp
  x         1410715640579 Unix ms timestamp
  H HH      0..23 Hours (24 hour time)
  h hh      1..12 Hours (12 hour time used with a A.)
  m mm      0..59 Minutes
  s ss      0..59 Seconds

  TODO:
  a A       am pm Post or ante meridiem (Note the one character a p are also considered valid)
  S SS SSS  0..999  Fractional seconds
  Z ZZ      +12:00  Offset from UTC as +-HH:mm, +-HHmm, or Z

*/
const vals = [
  { formatString: 'YY-MM-DD', output: (...rest) => `${rest[0]}-${prefixUnitZero(rest[1])}-${prefixUnitZero(rest[2])}` },
  { formatString: 'Do MMMM', output: (...rest) => `${getOrdinal(rest[2])} ${MONTHS_INDEX[rest[1] - 1].long}` },
  { formatString: 'D/MMMM/YY', output: (...rest) => `${rest[2]}/${MONTHS_INDEX[rest[1] - 1].long}/${rest[0]}` },
  { formatString: 'HH:mm', output: (...rest) => `${prefixUnitZero(rest[3])}:${prefixUnitZero(rest[4])}` },
];

describe('UTCDate', () => {
  testValues.leap.years.forEach(year => {
    testValues.leap.partial.forEach(partial => {
      vals.forEach(val => {
        const expected = val.output(year.year, partial.month, partial.date, partial.hour, partial.minute, partial.second);
        it(`#${partial.id} returns ${expected} for the format string ${val.formatString}`, () => {
          const utcDate = UTCDate([year.year, partial.month, partial.date, partial.hour, partial.minute, partial.second]);
          const format = val.formatString;
          assert.equal(utcDate.format(format), expected);
        });
      });
    });
  });
});

