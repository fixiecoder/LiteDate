const { MONTHS_INDEX } = require('./constants');

function calculateDayOfYear(isLeapYear, month, date) {
  let dayOfYear = MONTHS_INDEX[month - 1].dayOfYearIndex;
  if(isLeapYear && month > 2) {
    dayOfYear += 1;
  }

  dayOfYear += date;

  return dayOfYear;
}

module.exports = {
  calculateDayOfYear,
};

