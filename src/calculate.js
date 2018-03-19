const {
  MONTHS_INDEX,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_EPOCH_BASED,
  FEB_29_LAST_MS_PARTIAL,
  DAY_MS,
  HALF_DAY,
  QUARTER_DAY,
  YEAR_MS,
  HOUR_MS,
  MINUTE_MS,
  SECOND_MS,
  YEAR_NO_LEAP_MS,
  YEAR_LEAP_MS,
} = require('./constants');
const { getMonthNumberFromDayOfYear, getMonthFromNumber } = require('./methods');

const LEAP_FRACTION_LOWER = 0.041067761806981906;
const LEAP_FRACTION_UPPER = 0.25051334701466565;

function calculateYearAndPartialMs(epochMs) {
  if(epochMs >= 0) {
    const fourYears = YEAR_LEAP_MS + (3 * YEAR_NO_LEAP_MS);
    let count = (epochMs + YEAR_NO_LEAP_MS + YEAR_LEAP_MS) / fourYears;
    const countMod = count % 1;
    let leapDayOffset = 0;
    if(countMod < LEAP_FRACTION_LOWER) {
      count -= 1;
    } else if(countMod >= LEAP_FRACTION_LOWER && countMod <= LEAP_FRACTION_UPPER) {
      leapDayOffset = 1;
    }
    count = Math.floor(count);
    let year = Math.floor((epochMs - (count * DAY_MS)) / (365 * DAY_MS));
    const partialYearMs = epochMs - ((year * YEAR_NO_LEAP_MS) + ((count - leapDayOffset) * DAY_MS));
    year += 1970;
    return { year, partialYearMs };
  } else {
    // handle dates before 1970-01-01T00:00:00Z
    let year = 0;
    let partialYearMs = 0;
    let count = (epochMs + YEAR_NO_LEAP_MS + YEAR_LEAP_MS) / fourYears;

    return { year, partialYearMs };
  }
}

// function calculateYearAndPartialMs(epochMs) {
//   console.log('========================================');
//   console.log('========================================');

//   const fourYears = YEAR_LEAP_MS + (3 * YEAR_NO_LEAP_MS);
//   let count = (Math.abs(epochMs) + YEAR_NO_LEAP_MS + YEAR_LEAP_MS) / fourYears;
//   const countMod = count % 1;
//   let leapDayOffset = 0;
//   // console.log(countMod);
//   if(countMod < LEAP_FRACTION_LOWER) {
//     count -= 1;
//   }


//   count = Math.floor(count);
//   let year = (epochMs - (count * DAY_MS)) / (365 * DAY_MS);
//   console.log('count', count);
//   console.log('YEAR', year);
//   year = Math.floor(year);
//   console.log('YEAR-1', year);
//   let partialYearMs = Math.abs(epochMs) - ((Math.abs(year) * YEAR_NO_LEAP_MS) + ((count - leapDayOffset) * DAY_MS));
//   if(partialYearMs < 0) {
//     partialYearMs = Math.abs(partialYearMs);
//   }
//   year += 1970;
//   console.log('YEAR 2:', year);
//   return { year, partialYearMs };
// }

// function calculateYearAndPartialMs(epochMs) {
//   let year = 1970;
//   const fourYears = YEAR_LEAP_MS + (3 * YEAR_NO_LEAP_MS);
//   const count = Math.round(epochMs / fourYears);
//   const totalLeapDayMs = (count * DAY_MS);
//   const epochNoLeap = epochMs - totalLeapDayMs;
//   year = Math.floor(epochNoLeap / YEAR_NO_LEAP_MS);
//   const wholeYears = (year * YEAR_NO_LEAP_MS) + totalLeapDayMs;
//   let partialYearMs = epochMs - wholeYears;
//   year += 1970;
//   const isLeap = year % 4 === 0;
//   if(epochMs >= 0 && isLeap && partialYearMs > 3600000 * count) { // TODO: Work out the cut off for the partialYearMs greater than
//     partialYearMs += DAY_MS;
//   } else if(epochMs < 0 && isLeap) {
//     console.log('less than zero and leap')
//   }
//   return { year, partialYearMs };
// }

function calculateDayOfYear(partialYearMS) {
  return Math.floor(partialYearMS / DAY_MS) + 1;
}

function calculateDayOfWeek(epochMS) {
  return DAYS_OF_WEEK_EPOCH_BASED[Math.floor(epochMS / DAY_MS) % 7];
}

function caclulateEpochMS(dateArray = []) {
  let wholeYears = 0;
  let partialYear = 0;
  let isLeapYear = false;
  let leapYearCount = 0;
  let leapMs = 0;
  let mod;
  if(dateArray[0]) {

    mod = dateArray[0] % 4;
    isLeapYear = !mod;
    const yearsAfterEpoch = dateArray[0] - 1970;
    leapYearCount = Math.floor(yearsAfterEpoch / 4);
    leapMs = leapYearCount * DAY_MS;
    wholeYears = (yearsAfterEpoch * (DAY_MS * 365)) + (leapMs);
  } else {
    // if we don't have any element
    return Date.now();
  }

  let month;

  if(dateArray[1]) {
    const leapYearAddition = isLeapYear && dateArray[1] > 1 ? 1 : 0;
    month = getMonthFromNumber(dateArray[1]);
    partialYear += DAY_MS * (month.dayOfYearIndex + leapYearAddition);
  }

  if(dateArray[2]) {
    partialYear += (dateArray[2] - 1) * DAY_MS;
  }

  if(dateArray[3]) {
    partialYear += dateArray[3] * HOUR_MS;
  }

  if(dateArray[4]) {
    partialYear += dateArray[4] * MINUTE_MS;
  }

  if(dateArray[5]) {
    partialYear += dateArray[5] * SECOND_MS;
  }

  if(dateArray[6]) {
    partialYear += dateArray[6];
  }

  if(isLeapYear && partialYear > 31 * DAY_MS && partialYear <= FEB_29_LAST_MS_PARTIAL && dateArray[1] === 2) {
    partialYear -= DAY_MS;
  }

  if(!isLeapYear && mod === 1) {
    partialYear += DAY_MS;
  }

  const epochMs = partialYear + wholeYears;

  return { isLeapYear, epochMs };
}

function calculateIsLeapYear(year) {
  return !(year % 4);
}

function calculateHour(epochMs) {
  const dayRemainder = epochMs % DAY_MS;
  return Math.floor(dayRemainder / HOUR_MS);
}

function calculateDateFromPartialYear(dayOfYear, isLeapYear = false) {
  const monthNumber = getMonthNumberFromDayOfYear(dayOfYear, isLeapYear);
  let firstDayOfMonth = getMonthFromNumber(monthNumber).dayOfYearIndex;
  if(isLeapYear && dayOfYear > 60) {
    firstDayOfMonth += 1;
  }
  return dayOfYear - firstDayOfMonth;
}

module.exports = {
  calculateDayOfYear,
  calculateDayOfWeek,
  caclulateEpochMS,
  calculateIsLeapYear,
  calculateYearAndPartialMs,
  calculateHour,
  calculateDateFromPartialYear,
  getMonthNumberFromDayOfYear
};

