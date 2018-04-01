const { prefixUnitZero, getOrdinal } = require('./helpers');
const { FORMAT_PARTS, FORMAT_PARTS_FN_MAP } = require('./constants');

function format(formatString = '') {
  const rx = /(ss?)|(mm?)|(hh?)|(HH?)|(dd?d?d?)|(DD?o?)|(MM?M?M?)|(YY?Y?Y)|(.)/g;
  const outputArray = [];
  const matches = formatString.match(rx);
  for(let i = 0, length = matches.length; i < length; i += 1) {
    const fnAndArgs = FORMAT_PARTS_FN_MAP[matches[i]];
    outputArray.push(fnAndArgs ? this[fnAndArgs.fn].apply(this, fnAndArgs.args) : matches[i]);
  }
  return outputArray.join('');
}

module.exports = {
  format,
};
