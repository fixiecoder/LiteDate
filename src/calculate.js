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
const { getMonthFromNumber } = require('./helpers');

const LEAP_FRACTION_LOWER = 0.041067761806981906;
const LEAP_FRACTION_UPPER = 0.25051334701466565;

function calculateYearAndPartialMs(epochMs) {
  const fourYears = YEAR_LEAP_MS + (3 * YEAR_NO_LEAP_MS);
  if(epochMs >= 0) {
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
    const posEpochMs = Math.abs(epochMs);
    let count = (posEpochMs + YEAR_NO_LEAP_MS + YEAR_LEAP_MS) / fourYears;
    const countMod = count % 1;
    count = Math.floor(count);
    year = (posEpochMs - (count * DAY_MS)) / (365 * DAY_MS);
    year = Math.ceil(year);
    const wholeYears = ((year * YEAR_NO_LEAP_MS) + (count * DAY_MS));
    partialYearMs = Math.abs(posEpochMs - wholeYears);
    const isLeapYear = year % 4 === 2;
    if(countMod > 0.7 && isLeapYear) {
      partialYearMs += DAY_MS;
    }
    return { year: 1970 - year, partialYearMs };
  }
}

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
  if(dayRemainder < 0) {
    return 24 + Math.floor(dayRemainder / HOUR_MS);
  }
  return Math.floor(dayRemainder / HOUR_MS);
}

function calculateMinutes(epochMs) {
  const hourRemainder = epochMs % HOUR_MS;
  if(hourRemainder < 0) {
    return 60 + Math.floor(hourRemainder / MINUTE_MS);
  }
  return Math.floor(hourRemainder / MINUTE_MS);
}

function calculateSeconds(epochMs) {
  const minutesRemainder = epochMs % MINUTE_MS;
  if(minutesRemainder < 0) {
    return 60 + Math.floor(minutesRemainder / 1000);
  }
  return Math.floor(minutesRemainder / 1000);
}

function calculateMonthFromDayOfYear(dayOfYear, isLeapYear) {
  const leapYearAddition = isLeapYear ? 1 : 0;
  if(dayOfYear <= 31) {
    return MONTHS_INDEX[0]; // jan
  } else if(dayOfYear > 31 && dayOfYear <= 59 + leapYearAddition) {
    return MONTHS_INDEX[1]; // feb
  } else if(dayOfYear > 59 + leapYearAddition && dayOfYear <= 90 + leapYearAddition) {
    return MONTHS_INDEX[2]; // mar
  } else if(dayOfYear > 90 + leapYearAddition && dayOfYear <= 120 + leapYearAddition) {
    return MONTHS_INDEX[3]; // apr
  } else if(dayOfYear > 120 + leapYearAddition && dayOfYear <= 151 + leapYearAddition) {
    return MONTHS_INDEX[4]; // may
  } else if(dayOfYear > 151 + leapYearAddition && dayOfYear <= 181 + leapYearAddition) {
    return MONTHS_INDEX[5]; // jun
  } else if(dayOfYear > 181 + leapYearAddition && dayOfYear <= 212 + leapYearAddition) {
    return MONTHS_INDEX[6]; // jul
  } else if(dayOfYear > 212 + leapYearAddition && dayOfYear <= 243 + leapYearAddition) {
    return MONTHS_INDEX[7]; // aug
  } else if(dayOfYear > 243 + leapYearAddition && dayOfYear <= 273 + leapYearAddition) {
    return MONTHS_INDEX[8]; // sept
  } else if(dayOfYear > 273 + leapYearAddition && dayOfYear <= 304 + leapYearAddition) {
    return MONTHS_INDEX[9]; // oct
  } else if(dayOfYear > 304 + leapYearAddition && dayOfYear <= 334 + leapYearAddition) {
    return MONTHS_INDEX[10]; // nov
  } else if(dayOfYear > 334 + leapYearAddition && dayOfYear <= 365 + leapYearAddition) {
    return MONTHS_INDEX[11]; // nov
  } else {
    return MONTHS_INDEX[0];
  }
}

function calculateMonthNumberFromDayOfYear(dayOfYear, isLeapYear) {
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
  const monthNumber = calculateMonthNumberFromDayOfYear(dayOfYear, isLeapYear);
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
  calculateMinutes,
  calculateSeconds,
  calculateDateFromPartialYear,
  calculateMonthFromDayOfYear,
  calculateMonthNumberFromDayOfYear,
};

