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
  SECOND_MS,
  YEAR_NO_LEAP_MS,
  YEAR_LEAP_MS,
} = require('./constants');
const { getMonthFromNumber } = require('./methods');

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
  return Math.floor(partialYearMS / DAY_MS);
}

function calculateDayOfWeek(epochMS) {
  return DAYS_OF_WEEK_EPOCH_BASED[Math.floor(epochMS / DAY_MS) % 7];
}

function caclulateEpochMS(dateArray = []) {
  let epochMs = 0;
  let wholeYears = 0;
  let partialYear = 0;
  let isLeapYear = false;
  let leapYearCount = 0;
  if(dateArray[0]) {

    const mod = dateArray[0] % 4;
    isLeapYear = !mod;
    const yearsAfterEpoch = dateArray[0] - 1970;
    leapYearCount = Math.floor(yearsAfterEpoch / 4);
    const leapMs = leapYearCount * DAY_MS;
    wholeYears = (yearsAfterEpoch * (DAY_MS * 365)) + (leapMs);

    // epochMs -= DAY_MS;
    // if(mod) {
    //   epochMs -= mod * QUARTER_DAY;
    // } else {
    //   epochMs -= DAY_MS;
    // }

  } else {
    // if we don't have any element
    return this.now();
  }

  let month;

  if(dateArray[1]) {
    const leapYearAddition = isLeapYear && dateArray[1] > 1 ? 1 : 0;
    month = getMonthFromNumber(dateArray[1]);
    partialYear += DAY_MS * (month.dayOfYearIndex + leapYearAddition);
  }

  if(dateArray[2]) {
    if(dateArray[1] > 1 && dateArray[2] >= 28§§) {
      epochMs -= DAY_MS;

    }
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

  // if(partialYear >)

  return { isLeapYear, epochMs, month };
}

function calculateIsLeapYear(year) {
  return !(year % 4);
}

module.exports = {
  calculateDayOfYear,
  calculateDayOfWeek,
  caclulateEpochMS,
  calculateIsLeapYear,
  calculateYearAndPartialMs,
};

