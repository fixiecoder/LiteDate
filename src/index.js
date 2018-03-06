const DAY_MS = 86400000;
const HALF_DAY = 43200000; 
const QUARTER_DAY = 21600000;
let mod = year % 4;

if(mod) {
  yearsMs -= mod * QUARTER_DAY;
} else {
  yearsMs -= DAY_MS;
}
console.log(new Date(yearsMs));

/** prefixUnitZero
 * add a 0 to a number below 10 (ie, a unit)
 * @param val: number
 * @return string
 */
const prefixUnitZero = (val) => {
  let newVal = val;
  if (val < 0) {
    newVal = val / -1;
  }
  newVal = newVal < 10 ? `0${newVal}` : newVal;
  if (val < 0) {
    newVal = `-${newVal}`;
  }
  return newVal;
};

function getOrdinal(number) {
  const numberAsString = number.toString();
  const lastDigit = numberAsString.charAt(numberAsString.length - 1);
  switch(lastDigit) {
    case '1':
      return `${number}st`;
    case '2':
      return `${number}nd`;
    case '3':
      return `${number}rd`;
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
      return `${number}th`;
    default:
      return '';
  }
}

export default class UTCDate {
  constructor(dateValue) {
    this._originalDateValue = dateValue;
    this._jsDate = new Date(dateValue);
    if(this._jsDate.toString() === 'Invalid Date') {
      throw new Error('Invalid value given to UTCDate constructor');
    }



    this._monthsIndex = [
      { long: 'January', short: 'Jan' },
      { long: 'February', short: 'Feb' },
      { long: 'March', short: 'Mar' },
      { long: 'April', short: 'Apr' },
      { long: 'May', short: 'May' },
      { long: 'June', short: 'Jun' },
      { long: 'July', short: 'Jul' },
      { long: 'August', short: 'Aug' },
      { long: 'September', short: 'Sep' },
      { long: 'October', short: 'Oct' },
      { long: 'November', short: 'Nov' },
      { long: 'December', short: 'Dec' },
    ];

    this._daysOfWeek = [
      { long: 'Sunday', short: 'Sun', day: 7 },
      { long: 'Monday', short: 'Mon', day: 1 },
      { long: 'Tuesday', short: 'Tue', day: 2 },
      { long: 'Wednesday', short: 'Wed', day: 3 },
      { long: 'Thursday', short: 'Thu', day: 4 },
      { long: 'Friday', short: 'Fri', day: 5 },
      { long: 'Saturday', short: 'Sat', day: 6 },
    ];

    this._TYPES = { LONG: 'long', SHORT: 'short', MID: 'mid' };
  }

  caclulateEpoch(dateArray = []) {
    if(dateArray[0]) {
      let yearsMs = ((dateArray[0] - 1970) * DAY_MS * 365.25) + HALF_DAY;
    }

  }

  formatted(type = this._TYPES.LONG) {
    switch(type) {
      case this._TYPES.SHORT:
        return `${this.dayOfMonth()} ${this.getMonthName(type)}`;
      case this._TYPES.MID:
        return `${prefixUnitZero(this.dayOfMonth())} ${this.getMonthName(this._TYPES.SHORT)} ${this.getYear()} ${prefixUnitZero(this.getHours())}:${prefixUnitZero(this.getMinutes())}`;
      case this._TYPES.LONG:
        return `${this.getDayOfWeek(this._TYPES.LONG)} ${this.dayOfMonth()} ${this.getMonthName(this._TYPES.LONG)} ${this.getYear()} ${this.getHours()}:${this.getMinutes()}${this.getHours() >= 12 ? 'pm' : 'am'}`;
    }
  }

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
  format(formatString = '') {
    const splitCharsRX = /[\/\s:-]/g;
    const parts = formatString.split(/[\/\s:-]/);
    const splitChars = formatString.match(splitCharsRX);

    let output = '';

    for(let i = 0; i < parts.length; i += 1) {
      let partReplaceString = '';
      switch(parts[i]) {
        case 's':
          partReplaceString = this._jsDate.getSeconds();
          break;
        case 'ss':
          partReplaceString = prefixUnitZero(this._jsDate.getSeconds());
          break;
        case 'm':
          partReplaceString = this._jsDate.getMinutes();
          break;
        case 'mm':
          partReplaceString = prefixUnitZero(this._jsDate.getMinutes());
          break;  
        case 'H':
          partReplaceString = this._jsDate.getHours();
          break;
        case 'HH':
          partReplaceString = prefixUnitZero(this._jsDate.getHours());
          break;
        case 'h': {
          const hours = this._jsDate.getHours();
          partReplaceString = hours > 12 ? hours - 12 : hours;
          break;
        }
        case 'hh': {
          const hours = this._jsDate.getHours();
          partReplaceString = prefixUnitZero(hours > 12 ? hours - 12 : hours);
          break;
        }
        case 'x':
          partReplaceString = this._jsDate.getTime();
          break;
        case 'X':
          partReplaceString = this._jsDate.getTime() / 1000;
          break;
        case 'dddd':
          partReplaceString = this.getDayOfWeek(this._TYPES.LONG);
          break;
        case 'ddd':
          partReplaceString = this.getDayOfWeek(this._TYPES.SHORT);
          break;
        case 'Do':
          partReplaceString = getOrdinal(this.dayOfMonth());
          break;
        case 'D':
          partReplaceString = this.dayOfMonth();
          break;
        case 'DD':
          partReplaceString = prefixUnitZero(this.dayOfMonth());
          break;
        case 'M':
          partReplaceString = this.getMonthNumber();
          break;
        case 'MM':
          partReplaceString = prefixUnitZero(this.getMonthNumber());
          break;
        case 'MMM':
          partReplaceString = this.getMonthName(this._TYPES.SHORT);
          break;
        case 'MMMM':
          partReplaceString = this.getMonthName(this._TYPES.LONG);
          break;
        case 'YY':
          partReplaceString = this.getYear(this._TYPES.SHORT);
          break;
        case 'YYYY':
          partReplaceString = this.getYear();
          break;
        default:
          parts[i];
          break;
      }
      output += `${partReplaceString}${splitChars[i] || ''}`
    }

    return output;
  }

  getDayOfWeek(type = type = this._TYPES.LONG) {
    return this._daysOfWeek[this._jsDate.getUTCDay()][type];
  }

  getMinutes() {
    return this._jsDate.getMinutes();
  }

  getHours() {
    return this._jsDate.getUTCHours();
  }

  getYear(type = this._TYPES.LONG) {
    return this._jsDate.getUTCFullYear();
    if(type === this._TYPES.SHORT) {
      return this._jsDate.getUTCYear();
    }
  }

  getMonthNumber() {
    return this._jsDate.getUTCMonth() + 1;
  }

  getMonthName(type = this._TYPES.LONG) {
    return this._monthsIndex[this.monthAsIndex()][type];
  }

  dayOfMonth() {
    return this._jsDate.getUTCDate();
  }

  monthAsIndex() {
    return this._jsDate.getUTCMonth();
  }

  valueOf() {
    return this._jsDate.toISOString();
  }

  toString() {
    return this._jsDate.toISOString();
  }
}
