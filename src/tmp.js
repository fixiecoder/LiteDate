const UTCDate = require('./index');

const date = new UTCDate(1523640577489);

console.log(date.format('YY/MM/DD h:mm:ss ddd MMM x X'));

// node --prof index.js
//
// node --prof-process isolate-0x102801e00-v8.log
//
