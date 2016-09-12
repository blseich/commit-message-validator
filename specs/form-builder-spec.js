//Test Dependencies
var expect = require('chai').expect,
    sinon = require('sinon'),
    proxyquire = require('proxyquire');

//Build Stubs
var validateMessagesStub = sinon.stub(),
    mockConfigs = {
      successMessage: "description for success",
      failureMessage: "description for failure"
    };

var formBuilder = proxyquire('../lib/form-builder', {
  '../lib/commit-message-validator': validateMessagesStub,
  '../lib/configs': mockConfigs
});

describe('Form Builder', function() {
  var commits = [];

  validateMessagesStub.withArgs(commits).returns('validated state');

  it('should build return object containing context', function() {
    expect(formBuilder()).to.have.property('context').and.equal('Commit Message Validator');
  });

  it('should return object containing description', function() {
    expect(formBuilder()).to.have.property('description');
  });

  it('should return object containing state', function() {
    expect(formBuilder()).to.have.property('state');
  });

  it('should call validator to set state', function() {
    expect(formBuilder(commits).state).to.equal('validated state');
  });

  it('should set success description', function() {
    validateMessagesStub.withArgs(commits).returns('success');
    expect(formBuilder(commits).description).to.equal(mockConfigs.successMessage);
  });

  it('should set failure description', function() {
    validateMessagesStub.withArgs(commits).returns('failure');
    expect(formBuilder(commits).description).to.equal(mockConfigs.failureMessage);
  });

});