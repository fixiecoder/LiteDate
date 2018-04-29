const { prefixUnitZero, getOrdinal, getMsFromTimeUnit } = require('./helpers');
const {
  MONTHS_INDEX,
  DAYS_OF_WEEK,
} = require('./constants');
const {
  calculateDayOfYear,
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
  constructor(...args) {
    this._cache = {};
    if(Array.isArray(args[0])) {
      this._date = new Date(
        Date.UTC(
          args[0][0],
          args[0][1] - 1 || 0, // convert actual month number to month index, fallback to January (0)
          args[0][2] || 1,
          args[0][3] || 0,
          args[0][4] || 0,
          args[0][5] || 0,
          args[0][6] || 0
        )
      );
    } else if(typeof args[0] === 'number') {
      this._date = new Date(args[0]);
    } else {
      this._date = new Date();
    }

    this._TYPES = { LONG: 'long', SHORT: 'short', MID: 'mid' };
    this.format = format;
  }

  _getFormatEpoch(type = 'ms') {
    return type === 'ms' ? this._cache.epochMs : this._cache.epochMs / 1000;
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
    let hours = this.getHours();
    if(twelveHour && this._cache.hour > 12) {
      hours -= 12;
    }
    if(zeroPadded) {
      hours = prefixUnitZero(hours);
    }
    return hours;
  }

  _getFormatDayName(type = this._TYPES.LONG) {
    return DAYS_OF_WEEK[this.getDayOfWeek()][type];
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

  _getFormatMonthName(type = this._TYPES.LONG) {
    return MONTHS_INDEX[this.getMonth() - 1][type];
  }

  _getFormatMonths(zeroPadded = false) {
    let month = this.getMonth();
    if(zeroPadded) {
      month = prefixUnitZero(month);
    }
    return month;
  }

  /**
   * @desc returns an ISO8601 formatted date string
   * @return {String} ISO8601 formatted date string
   */
  toISOString() {
    if(this._cache._isoString === undefined) {
      this._cache._isoString = `${this.getYear()}-${prefixUnitZero(this.getMonth())}-${prefixUnitZero(this.getDate())}T${prefixUnitZero(this.getHour())}:${prefixUnitZero(0)}:${prefixUnitZero(0)}Z`;
    }
    return this._cache._isoString;
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
    return this.getTime();
  }

  /**
   * @desc The current time represented by the number milliseconds after epoch: 1970-01-01T00:00:00
   * @return {Number}
   */
  getTime() {
    if(this._cache._time === undefined) {
      this._cache._time = this._date.getTime();
    }
    return this._cache._time;
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
    if(this._cache._year === undefined) {
      this._cache._year = this._date.getUTCFullYear();
    }
    return this._cache._year;
  }

  getDayOfYear() {
    if(this._cache._dayOfYear === undefined) {
      this._cache._dayOfYear = calculateDayOfYear(this.getIsLeapYear(), this.getMonth(), this.getDate());
    }
    return this._cache._dayOfYear;
  }

  getIsLeapYear() {
    if(this._cache._isLeapYear === undefined) {
      this._cache._isLeapYear = !(2016 % 4);
    }
    return this._cache._isLeapYear;
  }

  getMonth() {
    return this._date.getUTCMonth() + 1;
  }

  getMonthName(type = this._TYPES.LONG) {
    return MONTHS_INDEX[this._date.getUTCMonth()][type];
  }

  getDate() {
    if(this._cache._date === undefined) {
      this._cache._date = this._date.getUTCDate();
    }
    return this._cache._date;
  }

  getDayOfWeek() {
    if(this._cache._dayOfWeek === undefined) {
      this._cache._dayOfWeek = this._date.getUTCDay();
    }
    return this._cache._dayOfWeek;
  }

  getHours() {
    if(this._cache._hours === undefined) {
      this._cache._hours = this._date.getUTCHours();
    }
    return this._cache._hours;
  }

  getMinutes() {
    if(this._cache._minutes === undefined) {
      this._cache._minutes = this._date.getUTCMinutes();
    }
    return this._cache._minutes;
  }

  getSeconds() {
    if(this._cache._seconds === undefined) {
      this._cache._seconds = this._date.getSeconds();
    }
    return this._cache._seconds;
  }

  addTime(time = 0, unit = 'ms') {
    const initTime = getMsFromTimeUnit(time, unit) + this.getTime();
    return new UTCDate(initTime);
  }
}

module.exports = UTCDate;
