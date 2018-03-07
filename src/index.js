const { prefixUnitZero, getOrdinal, getMonth, caclulateEpochMS } = require('./methods');
const {
  MONTHS_INDEX,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_2,
  DAY_MS,
  HALF_DAY,
  QUARTER_DAY,
  YEAR_MS,
} = require('./constants');

module.exports = class UTCDate {
  constructor(_date) {
    this._monthsIndex = MONTHS_INDEX;
    this._daysOfWeek = DAYS_OF_WEEK;
    this._originalDateValue = _date;
    if(!_date) {
      this.epochMs = this.now();
    } else if(Array.isArray(_date)) {
      this.epochMs = caclulateEpochMS(_date);
    } else if(typeof _date === 'number') {
      this.epochMs = _date;
    }
    this.isLeapYear = '';
    // this._monthsIndex = MONTHS_CONSTANTS;
    // this._daysOfWeek = DAYS_OF_WEEK;

    this._TYPES = { LONG: 'long', SHORT: 'short', MID: 'mid' };
  }

  valueOf() {
    return this.epochMs;
  }

  toString() {
    return 'this is a date'
  }

  getEpochMS() {
    return this.epochMs;
  }

  now() {
    return Date.now ? Date.now() : +(new Date());
  }

  _getRemainingMs() {
    return this.epochMs % YEAR_MS;
  }

  getYear() {
    return Math.floor(1970 + Math.floor(this.epochMs / YEAR_MS));
  }

  getDayOfYear() {
    return Math.floor(this._getRemainingMs() / DAY_MS);
  }

  getMonth() {
    return getMonth(this.getDayOfYear(), this.isLeapYear);
  }

  getDayOfWeek() {
    return DAYS_OF_WEEK_2[Math.floor(this.epochMs / DAY_MS) % 7];
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
}
