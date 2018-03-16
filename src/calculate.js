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

function calculateYearAndPartialMs(epochMs) {
  let year = 1970;
  const fourYears = YEAR_LEAP_MS + (3 * YEAR_NO_LEAP_MS);
  const count = Math.round(epochMs / fourYears);
  const totalLeapDayMs = (count * DAY_MS);
  const epochNoLeap = epochMs - totalLeapDayMs;
  year = Math.floor(epochNoLeap / YEAR_NO_LEAP_MS);
  const wholeYears = (year * YEAR_NO_LEAP_MS) + totalLeapDayMs;
  let partialYearMs = epochMs - wholeYears;
  year += 1970;
  if(year % 4 === 0 && partialYearMs > 3600000 * count) { // TODO: Work out the cut off for the partialYearMs greater than
    partialYearMs += DAY_MS;
  }
  return { year, partialYearMs };
}

function calculateDayOfYear(partialYearMS) {
  return Math.floor(partialYearMS / DAY_MS) + 1;
}

function calculateDayOfWeek(epochMS) {
  return DAYS_OF_WEEK_EPOCH_BASED[Math.floor(epochMS / DAY_MS) % 7];
}

function getMonthFromNumber(monthNumber) {
  if(monthNumber < 1) {
    throw new Error('months are not zero indexed, please use the correct month number e.g. for January use 1');
  }
  return MONTHS_INDEX[monthNumber - 1];
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

function getMonthNumberFromDayOfYear(dayOfYear, isLeapYear) {
  const leapYearAddition = isLeapYear ? 1 : 0;
  if(dayOfYear <= 31) {
    return 1; // jan
  } else if(dayOfYear > 31 && dayOfYear <= 59 + leapYearAddition) {
    return 2; // feb
  } else if(dayOfYear > 59 + leapYearAddition && dayOfYear <= 90 + leapYearAddition) {
    return 3; // mar
  } else if(dayOfYear > 90 + leapYearAddition && dayOfYear <= 120 + leapYearAddition) {
    return 4; // apr
  } else if(dayOfYear > 120 + leapYearAddition && dayOfYear <= 151 + leapYearAddition) {
    return 5; // may
  } else if(dayOfYear > 151 + leapYearAddition && dayOfYear <= 181 + leapYearAddition) {
    return 6; // jun
  } else if(dayOfYear > 181 + leapYearAddition && dayOfYear <= 212 + leapYearAddition) {
    return 7; // jul
  } else if(dayOfYear > 212 + leapYearAddition && dayOfYear <= 243 + leapYearAddition) {
    return 8; // aug
  } else if(dayOfYear > 243 + leapYearAddition && dayOfYear <= 273 + leapYearAddition) {
    return 9; // sept
  } else if(dayOfYear > 273 + leapYearAddition && dayOfYear <= 304 + leapYearAddition) {
    return 10; // oct
  } else if(dayOfYear > 304 + leapYearAddition && dayOfYear <= 334 + leapYearAddition) {
    return 11; // nov
  } else if(dayOfYear > 334 + leapYearAddition && dayOfYear <= 365 + leapYearAddition) {
    return 12; // nov
  } else {
    return 1;
  }
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

