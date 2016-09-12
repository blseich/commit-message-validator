//Test Dependencies
var expect = require('chai').expect,
    sinon = require('sinon'),
    proxyquire = require('proxyquire');

//Build Stubs
var requestStub = {
    get: sinon.stub()
  },
  extractCommitMessagesStub = sinon.stub();

//Initialize Module
var fetchCommitMessages = proxyquire('../lib/commit-message-fetcher', {
  'request': requestStub,
  '../lib/commit-message-extractor': extractCommitMessagesStub
})


describe('Commits Fetcher', function() {

  var commitsUrl = "commits url",
      body = "{\"foo\": \"bar\"}",
      commitMessageData = [],
      promise,
      returnedData;

  requestStub.get.callsArgWith(1, "error", "htmlResponse", body);
  extractCommitMessagesStub.withArgs(JSON.parse(body)).returns(commitMessageData);
  
  fetchCommitMessages(commitsUrl).then(function(data) {
    returnedData = data;
  });

  it('should fetch commits from url', function() {
    sinon.assert.calledWith(requestStub.get, sinon.match({'url': commitsUrl}))
  });

  it('should attach proper header', function() {
    sinon.assert.calledWith(requestStub.get, sinon.match({headers: sinon.match({'User-Agent': 'Commit Message Validator'})}));
  });

  it('should call commit message extractor', function() {
    sinon.assert.calledWith(extractCommitMessagesStub, JSON.parse(body));
  });

  it('should have returned commit message data', function() {
    expect(returnedData).to.be.equal(commitMessageData);
  });

});