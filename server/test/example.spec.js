// requring chai
import chai from 'chai';

const { expect } = chai;

const add = (a, b) => a + b;

describe('example test for add function', () => {
  it('should add two number ', () => {
    expect(add(1, 3)).to.equal(4);
  });
});
