const {
  MONTHS_INDEX,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_EPOCH_BASED,
  DAY_MS,
  HALF_DAY,
  QUARTER_DAY,
  YEAR_MS,
  HOUR_MS,
  MINUTE_MS,
  YEAR_NO_LEAP_MS,
} = require('./constants');
const { getMonthFromNumber } = require('./methods');


/*

let year = 2020;
const DAY_MS = 86400000;
const QUARTER_DAY = 21600000;
const HALF_DAY = 43200000;
let mod = year % 4;
let yearsMs = ((year - 1970) * DAY_MS * 365.25) + HALF_DAY;

if(mod) {
  yearsMs -= mod * QUARTER_DAY;
} else {
  yearsMs -= DAY_MS;
}
console.log(new Date(yearsMs));

*/

function calculateYearAndRemainder(epochMs) {
  console.log('AHHH')
  let a1 = 0;
  const leap = -2;
  let year = 1970;
  while (a1 < epochMs) {
    const LEAP_DAY = leap % 4 === 0 ? DAY_MS : 0;
    a1 += YEAR_NO_LEAP_MS + LEAP_DAY;
    if(a1 <= epochMs) {
      year += 1;
    }
  }

  console.log('YEAR', year);

  return { year };


  // const initialYearVal = (epochMs / YEAR_NO_LEAP_MS);
  // const numberOfLeapDays = initialYearVal / 4;
  // console.log('DAYS', numberOfLeapDays);
  // let leapMs = Math.floor(numberOfLeapDays) * DAY_MS;
  // let year = (epochMs - leapMs) / YEAR_NO_LEAP_MS;
  // let remainderOffset = 0;
  // const mod = Math.floor(year) % 4;
  // console.log('MOD', mod)
  // if(mod === 3) {
  //   // console.log("HERERERERERERE")
  //   // leapMs += DAY_MS;
  //   // remainderOffset = DAY_MS;
  //   // year = (epochMs - leapMs) / YEAR_NO_LEAP_MS;
  // } else if(mod === 1) {
  // }
  // year = Math.floor(year);
  // console.log('DAYS2', Math.floor(year / 4))
  // const wholeYears = (year * YEAR_NO_LEAP_MS) + (DAY_MS * Math.floor(year / 4));
  // year += 1970;

  // const remainder = epochMs - wholeYears - remainderOffset;

  // return { year, remainder };
}

function calculateYearFromMs(epochMs) {
  const initialYearVal = (epochMs / YEAR_NO_LEAP_MS);
  const numberOfLeapDays = initialYearVal / 4;
  let leapMs = Math.floor(numberOfLeapDays) * DAY_MS;
  let year = (epochMs - leapMs) / YEAR_NO_LEAP_MS;
  if(Math.floor(year) % 4 === 3) {
    leapMs += DAY_MS;
    year = (epochMs - leapMs) / YEAR_NO_LEAP_MS;
  }

  return Math.floor(year + 1970);
}

function calculatePartialYearMS(epochMs) {
  return epochMs % YEAR_MS;
}

function calculateDayOfYear(partialYearMS) {
  return Math.floor(partialYearMS / DAY_MS);
}

function calculateDayOfWeek(epochMS) {
  return DAYS_OF_WEEK_EPOCH_BASED[Math.floor(epochMS / DAY_MS) % 7];
}

function caclulateEpochMS(dateArray = []) {
  let epochMs = 0;
  let isLeapYear = false;
  if(dateArray[0]) {
    const mod = dateArray[0] % 4;
    isLeapYear = !mod;
    epochMs = ((dateArray[0] - 1970) * DAY_MS * 365.25) + HALF_DAY;
    if(mod) {
      epochMs -= mod * QUARTER_DAY;
    } else {
      epochMs -= DAY_MS;
    }

  } else {
    // if we don't have any element
    return this.now();
  }

  let month;

  if(dateArray[1]) {
    const leapYearAddition = isLeapYear && dateArray[1] > 1 ? 1 : 0;
    month = getMonthFromNumber(dateArray[1]);
    epochMs += DAY_MS * (month.dayOfYearIndex + leapYearAddition);
  }

  if(dateArray[2]) {
    epochMs += (dateArray[2] - 1) * DAY_MS;
  }

  if(dateArray[3]) {
    epochMs += dateArray[3] * HOUR_MS;
  }

  if(dateArray[4]) {
    epochMs += dateArray[4] * MINUTE_MS;
  }

  return { isLeapYear, epochMs, month };
}

function calculateIsLeapYear(year) {
  return !(year % 4);
}

module.exports = {
  calculateYearFromMs,
  calculatePartialYearMS,
  calculateDayOfYear,
  calculateDayOfWeek,
  caclulateEpochMS,
  calculateIsLeapYear,
  calculateYearAndRemainder,
};

