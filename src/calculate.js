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
  YEAR_LEAP_MS,
} = require('./constants');
const { getMonthFromNumber } = require('./methods');

function calculateYearAndRemainder(epochMs) {
  let year = 1970;
  const fourYears = YEAR_LEAP_MS + (3 * YEAR_NO_LEAP_MS);
  const count = Math.round(epochMs / fourYears);
  const totalLeapDayMs = (count * DAY_MS);
  const epochNoLeap = epochMs - totalLeapDayMs;
  year = Math.floor(epochNoLeap / YEAR_NO_LEAP_MS);
  const wholeYears = (year * YEAR_NO_LEAP_MS) + totalLeapDayMs;
  let remainder = epochMs - wholeYears;
  year += 1970;
  if(year % 4 === 0 && remainder > 3600000 * count) { // TODO: Work out the cut off for the remainder greater than
    remainder += DAY_MS;
  }
  return { year, remainder };
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

