const { assert } = require('chai');
const UTCDate = require('../src');

describe('somrhing', () => {
  it('should work', () => {
    const date = new UTCDate();
    console.log(date.valueOf())
    assert.isTrue(true);
  })
});
