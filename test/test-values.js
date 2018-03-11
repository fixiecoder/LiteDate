module.exports = {
  leap: {
    years: [
      // { epoch: 315532800000, year: 1980 },
      // { epoch: 567993600000, year: 1988 },
      // { epoch: 820454400000, year: 1996 },
      // { epoch: 1072915200000, year: 2004 },
      // { epoch: 1451606400000, year: 2016 },
      { epoch: 1577836800000, year: 2020 },
    ],
    remains: [
      // { id: 0, value: 0, month: 1, date: 1, hour: 0, minute: 0, second: 0 },
      // { id: 2, value: 5047810000, month: 2, date: 28, hour: 10, minute: 10, second: 10 },
      // { id: 3, value: 8421632000, month: 4, date: 7, hour: 11, minute: 20, second: 32 },
      // { id: 4, value: 18576558000, month: 8, date: 3, hour: 0, minute: 9, second: 19 },
      { id: 5, value: 31622399000, month: 12, date: 31, hour: 23, minute: 59, second: 59 },
    ],
  },
  noLeap: {
    years: [
      { epoch: 347155200000, year: 1981 },
      { epoch: 599616000000, year: 1989 },
      { epoch: 852076800000, year: 1997 },
      { epoch: 1104537600000, year: 2005 },
      { epoch: 1483228800000, year: 2017 },
      { epoch: 1546300800000, year: 2019 },
    ],
    remains: [
      { id: 0, value: 0, month: 1, date: 1, hour: 0, minute: 0, second: 0 },
      { id: 2, value: 5047810000, month: 2, date: 28, hour: 10, minute: 10, second: 10 },
      { id: 3, value: 8335232000, month: 4, date: 7, hour: 11, minute: 20, second: 32 },
      { id: 4, value: 18490158000, month: 8, date: 3, hour: 0, minute: 9, second: 19 },
      { id: 5, value: 31535999000, month: 12, date: 31, hour: 23, minute: 59, second: 59 },
    ],
  },
};
