const MONTHS_INDEX = [
  { long: 'January', short: 'Jan', daysInMonth: 31, dayOfYearIndex: 0 },
  { long: 'February', short: 'Feb', daysInMonth: 28, dayOfYearIndex: 31 },
  { long: 'March', short: 'Mar', daysInMonth: 31, dayOfYearIndex: 59 },
  { long: 'April', short: 'Apr', daysInMonth: 30, dayOfYearIndex: 90 },
  { long: 'May', short: 'May', daysInMonth: 31, dayOfYearIndex: 120 },
  { long: 'June', short: 'Jun', daysInMonth: 30, dayOfYearIndex: 151 },
  { long: 'July', short: 'Jul', daysInMonth: 31, dayOfYearIndex: 181 },
  { long: 'August', short: 'Aug', daysInMonth: 31, dayOfYearIndex: 212 },
  { long: 'September', short: 'Sep', daysInMonth: 30, dayOfYearIndex: 243 },
  { long: 'October', short: 'Oct', daysInMonth: 31, dayOfYearIndex: 273 },
  { long: 'November', short: 'Nov', daysInMonth: 30, dayOfYearIndex: 304 },
  { long: 'December', short: 'Dec', daysInMonth: 31, dayOfYearIndex: 334 },
];
const DAYS_OF_WEEK = [
  { long: 'Sunday', short: 'Sun', day: 7 },
  { long: 'Monday', short: 'Mon', day: 1 },
  { long: 'Tuesday', short: 'Tue', day: 2 },
  { long: 'Wednesday', short: 'Wed', day: 3 },
  { long: 'Thursday', short: 'Thu', day: 4 },
  { long: 'Friday', short: 'Fri', day: 5 },
  { long: 'Saturday', short: 'Sat', day: 6 },
];
const DAYS_OF_WEEK_EPOCH_BASED = [4, 5, 6, 0, 1, 2, 3];
const SECOND_MS = 1000;
const MINUTE_MS = 60000;
const HOUR_MS = 3600000;
const DAY_MS = 86400000;
const HALF_DAY = 43200000;
const QUARTER_DAY = 21600000;
const YEAR_MS = DAY_MS * 365.5;
const YEAR_NO_LEAP_MS = DAY_MS * 365;
const YEAR_LEAP_MS = DAY_MS * 366;
const FEB_29_LAST_MS_PARTIAL = 5270399999;
const FORMAT_PARTS = {
  SECONDS: 's',
  SECONDS_PADDED: 'ss',
  MINUTES: 'm',
  MINUTES_PADDED: 'mm',
  HOURS_24: 'H',
  HOURS_24_PADDED: 'HH',
  HOURS_12: 'h',
  HOURS_12_PADDED: 'hh',
  EPOCH_MS: 'x',
  EPOCH_S: 'X',
  DAY_NAME_LONG: 'dddd',
  DAY_NAME_SHORT: 'ddd',
  DATE_ORDINAL: 'Do',
  DATE: 'D',
  DATE_PADDED: 'DD',
  MONTH: 'M',
  MONTH_PADDED: 'MM',
  MONTH_NAME_SHORT: 'MMM',
  MONTH_NAME_LONG: 'MMMM',
  YEAR: 'YY',
  YEAR_FULL: 'YYYY',
};

module.exports = {
  MONTHS_INDEX,
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_EPOCH_BASED,
  FEB_29_LAST_MS_PARTIAL,
  SECOND_MS,
  MINUTE_MS,
  HOUR_MS,
  DAY_MS,
  HALF_DAY,
  QUARTER_DAY,
  YEAR_MS,
  YEAR_LEAP_MS,
  YEAR_NO_LEAP_MS,
  FORMAT_PARTS,
};
