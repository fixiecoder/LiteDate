const testValues = require('./test-values');

Date.now = () => testValues.leap.years[0].epoch;
