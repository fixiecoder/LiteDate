const { prefixUnitZero, getOrdinal } = require('./helpers');
const { FORMAT_PARTS, FORMAT_PARTS_FN_MAP } = require('./constants');
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

function convertFormatChunkIntoValue(chunk) {
  switch(chunk) {
    case FORMAT_PARTS.SECONDS:
      return this.getSeconds();

    case FORMAT_PARTS.SECONDS_PADDED:
      return prefixUnitZero(this.getSeconds());

    case FORMAT_PARTS.MINUTES:
      return this.getMinutes();

    case FORMAT_PARTS.MINUTES_PADDED:
      return prefixUnitZero(this.getMinutes());

    case FORMAT_PARTS.HOURS_24:
      return this.getHours();

    case FORMAT_PARTS.HOURS_24_PADDED:
      return prefixUnitZero(this.getHours());

    case FORMAT_PARTS.HOURS_12: {
      const hours = this.getHours();
      return hours > 12 ? hours - 12 : hours;

    }
    case FORMAT_PARTS.HOURS_12_PADDED: {
      const hours = this.getHours();
      return prefixUnitZero(hours > 12 ? hours - 12 : hours);

    }
    case FORMAT_PARTS.EPOCH_MS:
      return this.getTime();

    case FORMAT_PARTS.EPOCH_S:
      return this.getTime() / 1000;

    case FORMAT_PARTS.DAY_NAME_LONG:
      return this.getDayOfWeek(this._TYPES.LONG);

    case FORMAT_PARTS.DAY_NAME_SHORT:
      return this.getDayOfWeek(this._TYPES.SHORT);

    case FORMAT_PARTS.DATE_ORDINAL:
      return getOrdinal(this.getDate());

    case FORMAT_PARTS.DATE:
      return this.getDate();

    case FORMAT_PARTS.DATE_PADDED:
      return prefixUnitZero(this.getDate());

    case FORMAT_PARTS.MONTH:
      return this.getMonth();

    case FORMAT_PARTS.MONTH_PADDED:
      return prefixUnitZero(this.getMonth());

    case FORMAT_PARTS.MONTH_NAME_SHORT:
      return this.getMonthName(this._TYPES.SHORT);

    case FORMAT_PARTS.MONTH_NAME_LONG:
      return this.getMonthName(this._TYPES.LONG);

    case FORMAT_PARTS.YEAR:
      return this.getYear(this._TYPES.SHORT);

    case FORMAT_PARTS.YEAR_FULL:
      return this.getYear();

    default:
      return chunk;

  }
}

function format(formatString = '') {
  const rx = /(ss?)|(mm?)|(hh?)|(HH?)|(dd?d?d?)|(DD?o?)|(MM?M?M?)|(YY?Y?Y)|(.)/g;
  const chunk = [];
  const outputArray = [];
  let previousChar = '';
  const maxIterations = formatString.length - 1;
  const ordinal = ['D', 'o'];
  let skip = false;

  const matches = formatString.match(rx);
  for(let i = 0; i < matches.length; i += 1) {
    const fnAndArgs = FORMAT_PARTS_FN_MAP[matches[i]];
    outputArray.push(fnAndArgs ? this[fnAndArgs.fn](...fnAndArgs.args) : matches[i]);
  }
  return outputArray.join('');
}

module.exports = {
  format,
};
