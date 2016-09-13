var expect = require('chai').expect,
    proxyquire = require('proxyquire');

var validateMessage = proxyquire('../lib/commit-message-validator', {});

describe('Commit Message Validator', function() {
  var goodMessage = 'TEST-123: good test commit message';
      badMessage = 'this message stinks';

  it('should be a function', function() {
    expect(validateMessage).to.be.a('function');
  });

  it('should return a string', function() {
    expect(validateMessage('')).to.be.a('string');
  });

  it('should return success for a matching string', function() {
    expect(validateMessage(goodMessage)).to.equal('success');
  });

  it('should return failure for a string that does not match', function() {
    expect(validateMessage(badMessage)).to.equal('failure');
  });
});