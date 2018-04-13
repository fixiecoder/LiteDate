const UTCDate = require('./utc-date-class');

function immutc(...args) {
  return new UTCDate(...args);
}

module.exports = immutc;
