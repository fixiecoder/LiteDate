const { prefixUnitZero, getOrdinal, getMonthFromDayOfYear, getMonthNumberFromDayOfYear } = require('./methods');
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
  calculateHour
} = require('./calculate');

module.exports = class UTCDate {
  constructor(_date) {
    this._cache = {};
    this._monthsIndex = MONTHS_INDEX;
    this._daysOfWeek = DAYS_OF_WEEK;
    this._originalDateValue = _date;
    if(!_date) {
      this._cache.epochMs = this.now();
    } else if(Array.isArray(_date)) {
      const { isLeapYear, epochMs, month } = caclulateEpochMS(_date);
      this._cache.epochMs = epochMs;
      // this._cache.month = month;
      this._cache.year = _date[0] || 1970;
      this._cache.month = _date[1] || 1;
      this._cache.date = _date[2] || 1;
      this._cache.hour = _date[3] || 0;
      this._cache.minute = _date[4] || 0;
      this._cache.ms = _date[5] || 0;
      this._cache.isLeapYear = isLeapYear;
    } else if(typeof _date === 'number') {
      this._cache.epochMs = _date;
    }

    this._setIsLeapYear();
    this._TYPES = { LONG: 'long', SHORT: 'short', MID: 'mid' };
  }

  _setIsLeapYear() {
    if(this._cache.isLeapYear === undefined) {
      this._cache.isLeapYear = calculateIsLeapYear(this.getYear());
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

  toISOString() {
    return `${this.getYear()}-${prefixUnitZero(this.getMonth())}-${prefixUnitZero(this.getDate())}T${prefixUnitZero(this.getHour())}:${prefixUnitZero(0)}:${prefixUnitZero(0)}Z`;
  }

  valueOf() {
    return this._cache.epochMs;
  }

  toString() {
    return this.toISOString();
  }

  getEpochMS() {
    return this._cache.epochMs;
  }

  getTime() {
    return this._cache.epochMs;
  }

  now() {
    return Date.now ? Date.now() : +(new Date());
  }

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
      this._cache.month = getMonthNumberFromDayOfYear(this.getDayOfYear(), this._cache.isLeapYear);
    }
    return this._cache.month;
  }

  getDate() {
    if(this._cache.date === undefined) {
      this._cache.date = 1;
    }
    return this._cache.date;
  }

  getDayOfWeek() {
    if(this._cache.dayOfWeek === undefined) {
      this._cache.dayOfWeek = calculateDayOfWeek(this._cache.epochMs);
    }
    return this._cache.dayOfWeek;
  }

  getHour() {
    if(this._cache.hour === undefined) {
      this._cache.hour = calculateHour(this._cache.epochMs);
    }
    return this._cache.hour;
  }

  // getDayOfWeek(type = type = this._TYPES.LONG) {
  //   return this._daysOfWeek[this._jsDate.getUTCDay()][type];
  // }

  // getMinutes() {
  //   return this._jsDate.getMinutes();
  // }

  // getHours() {
  //   return this._jsDate.getUTCHours();
  // }

  // getYear(type = this._TYPES.LONG) {
  //   return this._jsDate.getUTCFullYear();
  //   if(type === this._TYPES.SHORT) {
  //     return this._jsDate.getUTCYear();
  //   }
  // }

  // getMonthNumber() {
  //   return this._jsDate.getUTCMonth() + 1;
  // }

  // getMonthName(type = this._TYPES.LONG) {
  //   return this._monthsIndex[this.monthAsIndex()][type];
  // }

  // dayOfMonth() {
  //   return this._jsDate.getUTCDate();
  // }

  // monthAsIndex() {
  //   return this._jsDate.getUTCMonth();
  // }

  // valueOf() {
  //   return this._jsDate.toISOString();
  // }

  // toString() {
  //   return this._jsDate.toISOString();
  // }

  // formatted(type = this._TYPES.LONG) {
  //   switch(type) {
  //     case this._TYPES.SHORT:
  //       return `${this.dayOfMonth()} ${this.getMonthName(type)}`;
  //     case this._TYPES.MID:
  //       return `${prefixUnitZero(this.dayOfMonth())} ${this.getMonthName(this._TYPES.SHORT)} ${this.getYear()} ${prefixUnitZero(this.getHours())}:${prefixUnitZero(this.getMinutes())}`;
  //     case this._TYPES.LONG:
  //       return `${this.getDayOfWeek(this._TYPES.LONG)} ${this.dayOfMonth()} ${this.getMonthName(this._TYPES.LONG)} ${this.getYear()} ${this.getHours()}:${this.getMinutes()}${this.getHours() >= 12 ? 'pm' : 'am'}`;
  //   }
  // }
};
