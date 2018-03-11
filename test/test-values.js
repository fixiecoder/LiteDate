const lastSecondOf2017 = 1514764799000;
// const lastSecondOf1980 = 347155199000;
// const lastSecondOf1996 = 852076799000;
// const startOf2018 = 1514764800000;
// const startOf1980 = 315532800000;
// const startOf1981 = 347155200000;
// const startOf2020 = 1577836800000;
const afterFebInLeapYear1980 = 326073599000;

module.exports = {
  leap: {
    start: [
      { epoch: 315532800000, year: 1980, month: 1, date: 1, hour: 0, minute: 0, second: 0 },
      { epoch: 1577836800000, year: 2020, month: 1, date: 1, hour: 0, minute: 0, second: 0 },
    ],
    end: [
      { epoch: 852076799000, year: 1996, month: 12, date: 31, hour: 23, minute: 59, second: 59 },
      { epoch: 347155199000, year: 1980, month: 12, date: 31, hour: 23, minute: 59, second: 59 },
    ],
    beforeLeapDay: [
      { epoch: 824035892000, year: 1996, month: 2, date: 11, hour: 10, minute: 51, second: 32 },
      { epoch: 696483819000, year: 1992, month: 1, date: 27, hour: 3, minute: 43, second: 39 },
    ],
    afterLeapDay: [
      { epoch: 326073599000, year: 1980, month: 5, date: 1, hour: 23, minute: 59, second: 59 },
      { epoch: 573117801000, year: 1988, month: 2, date: 29, hour: 7, minute: 23, second: 21 },
    ],
    leapDay: [],
  },
  noLeap: {
    start: [
      { epoch: 347155200000, year: 1981, month: 1, date: 1, hour: 0, minute: 0, second: 0 },
      { epoch: 347155200000, year: 2018, month: 1, date: 1, hour: 0, minute: 0, second: 0 },
    ],
    end: [
      { epoch: 1514764799000, year: 2017, month: 12, date: 31, hour: 23, minute: 59, second: 59 },
      { epoch: 883612799000, year: 1997, month: 12, date: 31, hour: 23, minute: 59, second: 59 },
    ],
    other: [
      { epoch: 739985665000, year: 1993, month: 6, date: 13, hour: 15, minute: 34, second: 25 },
      { epoch: 492217932000, year: 1985, month: 8, date: 6, hour: 23, minute: 12, second: 12 },
    ]
  },
}