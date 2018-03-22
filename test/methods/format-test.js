const { assert } = require('chai');
const { format } = require('../../src/methods');

const testValues = [
  { formatString: '', expected: '', constructorValue: 0 },
];

// describe('getOrdinal', () => {
//   testValues.forEach(value => {
//     it(`should return ${value.expected} when given ${value.formatString} for cunstructor ${value.constructorValue}`, () => {
//       const result = format(value.number);
//       assert.equal(result, expected);
//     });
//   });
// });
