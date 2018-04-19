const UTCDate = require('./index');
const moment = require('moment');

// const date = new UTCDate('2018-2-4', 'YYYY-D-M');
// const date = new UTCDate();

const d = moment([2018, 3, 7, 0, 0]).utc();
console.log(d.toISOString());

// console.log(date.format('YY/MM/DD h:mm:ss ddd MMM x X'));

// node --prof index.js
//
// node --prof-process isolate-0x102801e00-v8.log
//
const year = 2018;
const monthIndex = 3; // april
const month = 4; // april
const day = 7; // april
const hour = 0; // april
const minute = 0; // april

function jsUTC(bits) {
  return new Date(Date.UTC(bits[0], bits[1], bits[2], bits[3], bits[4]));
}

console.log(jsUTC([year, monthIndex, day, hour, minute]));
