const dayMs = 1000 * 60 * 60 * 24;
const QUARTER_OF_DAY = dayMs / 4;
const epochMs = Date.now();
const yearMs = 365.25 * dayMs;
const months = [
  { days: 31, name: 'January', shortName: 'Jan' },
  { days: 28, name: 'February', shortName: 'Feb' },
  { days: 31, name: 'March', shortName: 'Mar' },
  { days: 30, name: 'April', shortName: 'Apr' },
  { days: 31, name: 'May', shortName: 'May' },
  { days: 30, name: 'June', shortName: 'Jun' },
  { days: 31, name: 'July', shortName: 'Jul' },
  { days: 31, name: 'August', shortName: 'Aug' },
  { days: 30, name: 'September', shortName: 'Sep' },
  { days: 31, name: 'October', shortName: 'Oct' },
  { days: 30, name: 'November', shortName: 'Nov' },
  { days: 31, name: 'Decemeber', shortName: 'Dev' },
];

function getMonth(dayOfYear, isLeapYear) {
  const leapYearAddition = isLeapYear ? 1 : 0;
  if(dayOfYear <= 31) {
    return months[0]; // jan
  } else if(dayOfYear > 31 && dayOfYear <= 59 + leapYearAddition) {
    return months[1]; // feb
  } else if(dayOfYear > 59 + leapYearAddition && dayOfYear <= 90 + leapYearAddition) {
    return months[2]; // mar
  } else if(dayOfYear > 90 + leapYearAddition && dayOfYear <= 120 + leapYearAddition) {
    return months[3]; // apr
  } else if(dayOfYear > 120 + leapYearAddition && dayOfYear <= 151 + leapYearAddition) {
    return months[4]; // may
  } else if(dayOfYear > 151 + leapYearAddition && dayOfYear <= 181 + leapYearAddition) {
    return months[5]; // jun
  } else if(dayOfYear > 181 + leapYearAddition && dayOfYear <= 212 + leapYearAddition) {
    return months[6]; // jul
  } else if(dayOfYear > 212 + leapYearAddition && dayOfYear <= 243 + leapYearAddition) {
    return months[7]; // aug
  } else if(dayOfYear > 243 + leapYearAddition && dayOfYear <= 273 + leapYearAddition) {
    return months[8]; // sept
  } else if(dayOfYear > 273 + leapYearAddition && dayOfYear <= 304 + leapYearAddition) {
    return months[9]; // oct
  } else if(dayOfYear > 304 + leapYearAddition && dayOfYear <= 334 + leapYearAddition) {
    return months[10]; // nov
  } else if(dayOfYear > 334 + leapYearAddition && dayOfYear <= 365 + leapYearAddition) {
    return months[11]; // nov
  }
}

const daysOfWeek = ['THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY'];

class UTCDate {
  constructor(_date) {
    if(!_date) {
      _date = Date.now();
    } else if(Array.isArray(_date)) {
      //do something with array parts to constuct an epoch
    }

    this.epochMs = _date;
    this.isLeapYear = !(this.getYear() % 4);
  }

  _getRemainingMs() {
    return this.epochMs % yearMs;
  }

  getYear() {
    return Math.floor(1970 + Math.floor(this.epochMs / yearMs));
  }

  getDayOfYear() {
    return Math.floor(this._getRemainingMs() / dayMs);
  }

  getMonth() {
    return getMonth(this.getDayOfYear(), this.isLeapYear);
  }

  getDayOfWeek() {
    return daysOfWeek[Math.floor(this.epochMs / dayMs) % 7];
  }
}

const test1 = new UTCDate();

console.log(test1.getDayOfWeek());


class AltUTCDate {
  constructor(_date) {
    if(!_date) {
      this.utcDate1 = new Date();
    } else if(Array.isArray(_date)) {
      this.utcDate1 = new Date(Date.UTC(_date[0], _date[1], _date[2], _date[3], _date[4], 0));
    } else {
      this.utcDate1 = new Date(_date);
    }
  }

  getMonths() {
    return this.utcDate1.getUTCMonth();
  }
}

const d1 = new AltUTCDate([2018, 4, 3, 49, 40, 9])
console.log(d1.getMonths());

// console.log(test1.getDayOfYear());
// console.log(test1.getYear());




// const yearsSinceEpoch = Math.floor(epochMs / yearMs);
// const year = Math.floor(1970 + yearsSinceEpoch);
// const leapYearMod = year % 4;
// const isLeapYear = !leapYearMod;
// let rest = epochMs % yearMs;

// // TODO: MAYBE NOT ! check if last day of year and not leapyear and (if the remainder from leapYearMod is 3) then you need to rollover to next year

// // if(leapYearMod) {
// //   console.log('HERE',leapYearMod)
// //   rest -= leapYearMod * QUARTER_OF_DAY;
// // } else {
// //   rest += dayMs;
// // }

// const dayOfYear = rest / dayMs;

// console.log('MONTH', getMonth(dayOfYear, isLeapYear))

// console.log('isLeapYear', isLeapYear);
// console.log('yearsSinceEpoch', yearsSinceEpoch);
// console.log('year', year);
// console.log('leapYearMod', leapYearMod);
// console.log('rest', rest);
// console.log('dayOfYear', dayOfYear);
