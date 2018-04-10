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
  MILLISECONDS: 'ms',
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

const UNIT_MS_VALUES = {
  ms: 0,
  s: 1000,
  m: 60000,
  h: 3600000,
};

const FORMAT_PARTS_FN_MAP = {
  [FORMAT_PARTS.SECONDS]: { fn: 'getSeconds', args: [] },
  [FORMAT_PARTS.SECONDS_PADDED]: { fn: 'getSeconds', args: [true] },
  [FORMAT_PARTS.MINUTES]: { fn: '_getFormatMinutes', args: [] },
  [FORMAT_PARTS.MINUTES_PADDED]: { fn: '_getFormatMinutes', args: [true] },
  [FORMAT_PARTS.HOURS_24]: { fn: '_getFormatHours', args: [false, false] },
  [FORMAT_PARTS.HOURS_24_PADDED]: { fn: '_getFormatHours', args: [true, false] },
  [FORMAT_PARTS.HOURS_12]: { fn: '_getFormatHours', args: [false, true] },
  [FORMAT_PARTS.HOURS_12_PADDED]: { fn: '_getFormatHours', args: [true, true] },
  [FORMAT_PARTS.EPOCH_MS]: { fn: '__________', args: [] },
  [FORMAT_PARTS.EPOCH_S]: { fn: '__________', args: [] },
  [FORMAT_PARTS.DAY_NAME_LONG]: { fn: 'getDayOfWeek', args: ['long'] },
  [FORMAT_PARTS.DAY_NAME_SHORT]: { fn: 'getDayOfWeek', args: ['short'] },
  [FORMAT_PARTS.DATE_ORDINAL]: { fn: '_getFormatDate', args: [false, true] },
  [FORMAT_PARTS.DATE]: { fn: '_getFormatDate', args: [] },
  [FORMAT_PARTS.DATE_PADDED]: { fn: '_getFormatDate', args: [true] },
  [FORMAT_PARTS.MONTH]: { fn: '_getFormatMonths', args: [false] },
  [FORMAT_PARTS.MONTH_PADDED]: { fn: '_getFormatMonths', args: [true] },
  [FORMAT_PARTS.MONTH_NAME_SHORT]: { fn: 'getMonthName', args: ['short'] },
  [FORMAT_PARTS.MONTH_NAME_LONG]: { fn: 'getMonthName', args: ['long'] },
  [FORMAT_PARTS.YEAR]: { fn: 'getYear', args: [] },
  [FORMAT_PARTS.YEAR_FULL]: { fn: 'getYear', args: [] },
};

/*

Month M 1 2 ... 11 12
Mo  1st 2nd ... 11th 12th
MM  01 02 ... 11 12
MMM Jan Feb ... Nov Dec
MMMM  January February ... November December
Quarter Q 1 2 3 4
Qo  1st 2nd 3rd 4th
Day of Month  D 1 2 ... 30 31
Do  1st 2nd ... 30th 31st
DD  01 02 ... 30 31
Day of Year DDD 1 2 ... 364 365
DDDo  1st 2nd ... 364th 365th
DDDD  001 002 ... 364 365
Day of Week d 0 1 ... 5 6
do  0th 1st ... 5th 6th
dd  Su Mo ... Fr Sa
ddd Sun Mon ... Fri Sat
dddd  Sunday Monday ... Friday Saturday
Day of Week (Locale)  e 0 1 ... 5 6
Day of Week (ISO) E 1 2 ... 6 7
Week of Year  w 1 2 ... 52 53
wo  1st 2nd ... 52nd 53rd
ww  01 02 ... 52 53
Week of Year (ISO)  W 1 2 ... 52 53
Wo  1st 2nd ... 52nd 53rd
WW  01 02 ... 52 53
Year  YY  70 71 ... 29 30
YYYY  1970 1971 ... 2029 2030
Y 1970 1971 ... 9999 +10000 +10001 
Note: This complies with the ISO 8601 standard for dates past the year 9999
Week Year gg  70 71 ... 29 30
gggg  1970 1971 ... 2029 2030
Week Year (ISO) GG  70 71 ... 29 30
GGGG  1970 1971 ... 2029 2030
AM/PM A AM PM
a am pm
Hour  H 0 1 ... 22 23
HH  00 01 ... 22 23
h 1 2 ... 11 12
hh  01 02 ... 11 12
k 1 2 ... 23 24
kk  01 02 ... 23 24
Minute  m 0 1 ... 58 59
mm  00 01 ... 58 59
Second  s 0 1 ... 58 59
ss  00 01 ... 58 59
Fractional Second S 0 1 ... 8 9
SS  00 01 ... 98 99
SSS 000 001 ... 998 999
SSSS ... SSSSSSSSS  000[0..] 001[0..] ... 998[0..] 999[0..]
Time Zone z or zz EST CST ... MST PST 
Note: as of 1.6.0, the z/zz format tokens have been deprecated from plain moment objects. Read more about it here. However, they do work if you are using a specific time zone with the moment-timezone addon.
Z -07:00 -06:00 ... +06:00 +07:00
ZZ  -0700 -0600 ... +0600 +0700
Unix Timestamp  X 1360013296
Unix Millisecond Timestamp  x 1360013296123

 */

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
  FORMAT_PARTS_FN_MAP,
  UNIT_MS_VALUES,
};
