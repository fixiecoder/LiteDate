const { prefixUnitZero, getOrdinal, getMsFromTimeUnit } = require('./helpers');
const {
  MONTHS_INDEX,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_EPOCH_BASED,
  DAY_MS,
  HALF_DAY,
  QUARTER_DAY,
  YEAR_MS,
} = require('./constants');
const {
  calculateYearAndPartialMs,
  calculateDayOfYear,
  calculateDayOfWeek,
  caclulateEpochMS,
  calculateIsLeapYear,
  calculateHour,
  calculateDateFromPartialYear,
  calculateMonthNumberFromDayOfYear,
  calculateMinutes,
  calculateSeconds,
} = require('./calculate');
const { format } = require('./methods');

/**
 * this is the main app
 * @constructor
 *
 * @param {Number|Array|String} date epoch date in milliseconds lkjaljfdsa
 *
 * @return {Object}
 */
class UTCDate {
  constructor(_date) {
    this._cache = {};
    this._monthsIndex = MONTHS_INDEX;
    this._daysOfWeek = DAYS_OF_WEEK;
    this._originalDateValue = _date;
    if(!_date) {
      this._cache.epochMs = Date.now();
    } else if(Array.isArray(_date)) {
      const { isLeapYear, epochMs } = caclulateEpochMS(_date);
      this._cache.epochMs = epochMs;
      this._cache.year = _date[0] || 1970;
      this._cache.month = _date[1] || 1;
      this._cache.date = _date[2] || 1;
      this._cache.hour = _date[3] || 0;
      this._cache.minute = _date[4] || 0;
      this._cache.seconds = _date[5] || 0;
      this._cache.ms = _date[6] || 0;
      this._cache.isLeapYear = isLeapYear;
    } else if(typeof _date === 'number') {
      this._cache.epochMs = _date;
    }
    this._setYearAndPartialYearMS();
    this._setIsLeapYear();
    this._TYPES = { LONG: 'long', SHORT: 'short', MID: 'mid' };
    this.format = format;
  }

  _setIsLeapYear() {
    if(this._cache.isLeapYear === undefined) {
      this._cache.isLeapYear = calculateIsLeapYear(this.getYear());
    }
    return this._cache.isLeapYear;
  }

  _getIsLeapYear() {
    if(this._cache.isLeapYear === undefined) {
      this._setIsLeapYear();
    }
    return this._cache.isLeapYear;
  }

  _setYearAndPartialYearMS() {
    const { year, partialYearMs } = calculateYearAndPartialMs(this._cache.epochMs);
    this._cache.partialYearMS = partialYearMs;
    this._cache.year = year;
  }

  _getPartialYearMS() {
    if(this._cache.partialYearMS === undefined) {
      this._setYearAndPartialYearMS();
    }
    return this._cache.partialYearMS;
  }

  _getFormatSeconds(zeroPadded = false) {
    let seconds = this.getSeconds();
    if(zeroPadded) {
      seconds = prefixUnitZero(seconds);
    }
    return seconds;
  }

  _getFormatMinutes(zeroPadded = false) {
    let minutes = this.getMinutes();
    if(zeroPadded) {
      minutes = prefixUnitZero(minutes);
    }
    return minutes;
  }

  _getFormatHours(zeroPadded = false, twelveHour = false) {
    let hours = this._getHours();
    if(twelveHour && this._cache.hour > 12) {
      hours -= 12;
    }
    if(zeroPadded) {
      hours = prefixUnitZero(hours);
    }
    return hours;
  }

  _getFormatDate(zeroPadded = false, ordinal = false) {
    let date = this.getDate();
    if(zeroPadded) {
      date = prefixUnitZero(date);
    }

    if(ordinal) {
      date = getOrdinal(date);
    }

    return date;
  }

  _getFormatMonths(zeroPadded = false) {
    let month = this.getMonth();
    if(zeroPadded) {
      month = prefixUnitZero(month);
    }
    return month;
  } 

  _getHours(zeroPadded = false, twelveHour = false) {
    if(this._cache.hour === undefined) {
      this._cache.hour = calculateHour(this._cache.epochMs);
    }
    return this._cache.hour;
  }

  /**
   * @desc returns an ISO8601 formatted date string
   * @return {String} ISO8601 formatted date string
   */
  toISOString() {
    return `${this.getYear()}-${prefixUnitZero(this.getMonth())}-${prefixUnitZero(this.getDate())}T${prefixUnitZero(this.getHour())}:${prefixUnitZero(0)}:${prefixUnitZero(0)}Z`;
  }

  valueOf() {
    return this._cache.epochMs;
  }

  toString() {
    return this.toISOString();
  }

  /**
   * @desc Epoch MS is the amount of milliseconds since January 1, 1970 00:00:00 UTC.
   * @return {Number} epoch in milliseconds
   */
  getEpochMS() {
    return this._cache.epochMs;
  }

  /**
   * @desc The current time represented by the number milliseconds after epoch: 1970-01-01T00:00:00
   * @return {Number}
   */
  getTime() {
    return this._cache.epochMs;
  }

  /**
   * @desc returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
   * @return {Number} epoch in milliseconds
   * @static
   */
  static now() {
    return Date.now ? Date.now() : +(new Date());
  }

  /**
   * @desc Gets the year of the date object for the value it was initialised with.
   * @return {Number} 4 digit year as integer e.g. 1980
   */
  getYear() {
    if(this._cache.year === undefined) {
      this._setYearAndPartialYearMS();
    }
    return this._cache.year;
  }

  getDayOfYear() {
    if(this._cache.dayOfYear === undefined) {
      this._cache.dayOfYear = calculateDayOfYear(this._getPartialYearMS());
    }
    return this._cache.dayOfYear;
  }

  getMonth() {
    if(this._cache.month === undefined) {
      this._cache.month = calculateMonthNumberFromDayOfYear(this.getDayOfYear(), this._cache.isLeapYear);
    }
    return this._cache.month;
  }

  getMonthName(type = this._TYPES.LONG) {
    return MONTHS_INDEX[this.getMonth() - 1][type];
  }

  getDate() {
    if(this._cache.date === undefined) {
      this._cache.date = calculateDateFromPartialYear(this.getDayOfYear(), this._getIsLeapYear());
    }
    return this._cache.date;
  }

  getDayOfWeek() {
    if(this._cache.dayOfWeek === undefined) {
      this._cache.dayOfWeek = calculateDayOfWeek(this._cache.epochMs);
    }
    return this._cache.dayOfWeek;
  }

  getHours() {
    return this._getHours();
  }

  getMinutes() {
    if(this._cache.minutes === undefined) {
      this._cache.minutes = calculateMinutes(this._cache.epochMs);
    }
    return this._cache.minutes;
  }

  getSeconds() {
    if(this._cache.seconds === undefined) {
      this._cache.seconds = calculateSeconds(this._cache.epochMs);
    }
    return this._cache.seconds;
  }

  addTime(time = 0, unit = 'ms') {
    const initTime = getMsFromTimeUnit(time, unit) + this.cache._epochMs;
    return new UTCDate(initTime);
  }
}

function immutc(...args) {
  return new UTCDate(...args);
}

module.exports = immutc;
