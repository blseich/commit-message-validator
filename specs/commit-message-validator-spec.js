var expect = require('chai').expect,
    proxyquire = require('proxyquire');

var validateMessages = proxyquire('../lib/commit-message-validator', {});

describe('Commit Message Validator', function() {
  var goodMessage = 'TEST-123: good test commit message';
      badMessage = 'this message stinks';

  it('should be a function', function() {
    expect(validateMessages).to.be.a('function');
  });

  it('should return a string', function() {
    expect(validateMessages([])).to.be.a('string');
  });

  it('should return success for a matching string', function() {
    var messages = [goodMessage];
    expect(validateMessages(messages)).to.equal('success');
  });

  it('should return failure for a string that does not match', function() {
    var messages = [badMessage];
    expect(validateMessages(messages)).to.equal('failure');
  });

  it('should return success for a colleciton of matching strings', function() {
    var messages = [goodMessage, goodMessage, goodMessage];
    expect(validateMessages(messages)).to.equal('success');
  });

  it('should fail if just one message is bad', function() {
    var messages = [goodMessage, badMessage, goodMessage];
    expect(validateMessages(messages)).to.equal('failure');
  });

});