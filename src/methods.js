const { FORMAT_PARTS_FN_MAP } = require('./constants');

const rx = /\[(.+)\]|(ss?)|(mm?)|(hh?)|(HH?)|(dd?d?d?)|(DD?o?)|(MM?M?M?)|(YY?Y?Y)|(.)/g;
const escapedStringRX = /\[(.+)\]/;
function format(formatString = '') {
  if(!formatString) {
    return '';
  }
  const outputArray = [];
  const matches = formatString.match(rx);
  for(let i = 0, length = matches.length; i < length; i += 1) {
    const match = matches[i];
    const fnAndArgs = FORMAT_PARTS_FN_MAP[match];

    if(fnAndArgs) {
      outputArray.push(fnAndArgs.fn !== undefined ? this[fnAndArgs.fn].apply(this, fnAndArgs.args) : fnAndArgs.value);
    } else if(escapedStringRX.test(match)) {
      outputArray.push(match.substring(1, match.length - 1));
    } else {
      outputArray.push(matches[i]);
    }
  }
  return outputArray.join('');
}

module.exports = {
  format,
};
