const { prefixUnitZero, getOrdinal } = require('./helpers');
const { FORMAT_PARTS, FORMAT_PARTS_FN_MAP } = require('./constants');

const rx = /\[(.+)\]|(ss?)|(mm?)|(hh?)|(HH?)|(dd?d?d?)|(DD?o?)|(MM?M?M?)|(YY?Y?Y)|(.)/g;
const escapedStringRX = /\[(.+)\]/;
function format(formatString = '') {
  const outputArray = [];
  const matches = formatString.match(rx);
  for(let i = 0, length = matches.length; i < length; i += 1) {
    const match = matches[i]
    const fnAndArgs = FORMAT_PARTS_FN_MAP[match];
    if(escapedStringRX.test(match)) {
      outputArray.push(match.substring(1, match.length - 1));
    } else {
      outputArray.push(fnAndArgs !== undefined ? this[fnAndArgs.fn].apply(this, fnAndArgs.args) : matches[i]);
    }
  }
  return outputArray.join('');
}

module.exports = {
  format,
};
