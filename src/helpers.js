const { MONTHS_INDEX } = require('./constants');

/** prefixUnitZero
 * add a 0 to a number below 10 (ie, a unit)
 * @param val: number
 * @return string
 */
function prefixUnitZero(val) {
  // let newVal = val;
  // // if(val < 0) {
  // //   newVal = val / -1;
  // // }
  // newVal = newVal < 10 ? `0${newVal}` : newVal;
  // if(val < 0) {
  //   newVal = `-${newVal}`;
  // }
  return val < 10 ? `0${val}` : val;
}

/** prefixUnitZero
 * add a 0 to a number below 10 (ie, a unit)
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

module.exports = {
  getOrdinal,
  prefixUnitZero,
  getMonthFromNumber,
  prefixUnitZeroSigned,
};
