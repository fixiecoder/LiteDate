const { MONTHS_INDEX, UNIT_MS_VALUES } = require('./constants');
const { FORMAT_PARTS_PARSE_MAP } = require('./constants');

/** prefixUnitZero
 * Add a 0 to a number less than two digits long
 * @param val: number
 * @return string
 */
function prefixUnitZero(val) {
  return val < 10 ? `0${val}` : val;
}

/** prefixUnitZeroSigned
 * Add a 0 to a number less than two digits long including negative numbers
 * @param val: number
 * @return string
 */
function prefixUnitZeroSigned(val) {
  let newVal = val;
  if(val < 0) {
    newVal = val / -1;
  }
  newVal = newVal < 10 ? `0${newVal}` : newVal;
  if(val < 0) {
    newVal = `-${newVal}`;
  }
  return newVal;
}

function getOrdinal(number) {
  const numberAsString = number.toString();
  const lastDigit = numberAsString.charAt(numberAsString.length - 1);
  switch(lastDigit) {
    case '1':
      return `${number}st`;
    case '2':
      return `${number}nd`;
    case '3':
      return `${number}rd`;
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
    default:
      return `${number}th`;
  }
}

function getMonthFromNumber(monthNumber) {
  if(monthNumber < 1 || monthNumber > 12) {
    throw new Error('months are not zero indexed, please use the correct month number e.g. for January use 1');
  }
  return MONTHS_INDEX[monthNumber - 1];
}

function getMsFromTimeUnit(time, unit) {
  return time * (UNIT_MS_VALUES[unit] || 0);
}

function parseFormattedDate(dateString, formatString) {
  const rx = /\[(.+)\]|(ss?)|(mm?)|(hh?)|(HH?)|(dd?d?d?)|(DD?o?)|(MM?M?M?)|(YY?Y?Y)|(.)/g;
  const match = formatString.match(rx);
  const result = [];
  let pos = 0;
  for(let i = 0; i < match.length; i += 1) {
    const part = FORMAT_PARTS_PARSE_MAP[match[i]];
    

  }
  console.log(match);

}

module.exports = {
  getOrdinal,
  prefixUnitZero,
  getMonthFromNumber,
  prefixUnitZeroSigned,
  getMsFromTimeUnit,
  parseFormattedDate,
};
