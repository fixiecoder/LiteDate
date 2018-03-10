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
  YEAR_MS_SHORT,
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
  const initialYearVal = (epochMs / YEAR_MS_SHORT);
  const numberOfLeapDays = initialYearVal / 4;
  let leapMs = Math.floor(numberOfLeapDays) * DAY_MS;
  let year = (epochMs - leapMs) / YEAR_MS_SHORT;
  if(Math.floor(year) % 4 === 3) {
    leapMs += DAY_MS;
    year = (epochMs - leapMs) / YEAR_MS_SHORT;
  }
  const remainder = epochMs - ((year * YEAR_MS_SHORT) + leapMs);

  year = Math.floor(year + 1970);


  return { year, remainder };
}

function calculateYearFromMs(epochMs) {
  const initialYearVal = (epochMs / YEAR_MS_SHORT);
  const numberOfLeapDays = initialYearVal / 4;
  let leapMs = Math.floor(numberOfLeapDays) * DAY_MS;
  let year = (epochMs - leapMs) / YEAR_MS_SHORT;
  if(Math.floor(year) % 4 === 3) {
    leapMs += DAY_MS;
    year = (epochMs - leapMs) / YEAR_MS_SHORT;
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

