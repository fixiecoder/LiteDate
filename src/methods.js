const { prefixUnitZero, getOrdinal } = require('./helpers');

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
    case 's':
      return this.getSeconds();

    case 'ss':
      return prefixUnitZero(this.getSeconds());

    case 'm':
      return this.getMinutes();

    case 'mm':
      return prefixUnitZero(this.getMinutes());

    case 'H':
      return this.getHours();

    case 'HH':
      return prefixUnitZero(this.getHours());

    case 'h': {
      const hours = this.getHours();
      return hours > 12 ? hours - 12 : hours;

    }
    case 'hh': {
      const hours = this.getHours();
      return prefixUnitZero(hours > 12 ? hours - 12 : hours);

    }
    case 'x':
      return this.getTime();

    case 'X':
      return this.getTime() / 1000;

    case 'dddd':
      return this.getDayOfWeek(this._TYPES.LONG);

    case 'ddd':
      return this.getDayOfWeek(this._TYPES.SHORT);

    case 'Do':
      return getOrdinal(this.getDate());

    case 'D':
      return this.getDate();

    case 'DD':
      return prefixUnitZero(this.getDate());

    case 'M':
      return this.getMonth();

    case 'MM':
      return prefixUnitZero(this.getMonth());

    case 'MMM':
      return this.getMonthName(this._TYPES.SHORT);

    case 'MMMM':
      return this.getMonthName(this._TYPES.LONG);

    case 'YY':
      return this.getYear(this._TYPES.SHORT);

    case 'YYYY':
      return this.getYear();

    default:
      return chunk;

  }
}

function format(formatString = '') {
  const chunk = [];
  const outputArray = [];
  let previousChar = '';
  const maxIterations = formatString.length - 1;
  const ordinal = ['D', 'o'];
  let skip = false;

  for(let i = 0; i <= maxIterations; i += 1) {
    const currentChar = formatString.charAt(i);
    if((currentChar !== previousChar && i !== 0) || i === maxIterations) {
      if((previousChar === ordinal[0] && currentChar === ordinal[1]) || i === maxIterations) {
        chunk.push(currentChar);
        skip = true;
      }
      // get the correct value for the chunk and push it into the outputArray
      // reset the chunck back to length 0
      outputArray.push(convertFormatChunkIntoValue.call(this, chunk.join('')));
      chunk.length = 0;
    }
    if(skip === false) {
      chunk.push(currentChar);
    } else {
      skip = false;
    }
    previousChar = currentChar;
  }


  return outputArray.join('');
}

module.exports = {
  format,
};
