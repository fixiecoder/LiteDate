const UTCDate = require('./index');

const date = new UTCDate(0);

date.format('YY/MM/DD');

// node --prof index.js
// 
// node --prof-process isolate-0x102801e00-v8.log