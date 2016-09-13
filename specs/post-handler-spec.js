//Test Dependencies
var stub = require('sinon').stub,
    spy = require('sinon').spy,
    assert = require('sinon').assert,
    match = require('sinon').match,
    proxyquire = require('proxyquire');

//Build Stubs
var requestStub = {
      post: spy()
    },
    promiseStub = {
      then: stub()
    },
    buildFormStub = stub(),
    mockConfigs = {
      accessToken: 'access_token'
    };

//Initialize Module
var postHandler = proxyquire('../lib/post-handler', {
  'request': requestStub,
  '../lib/form-builder': buildFormStub,
  '../lib/configs': mockConfigs
});


describe('Post Handler', function() {
  var statsUrl = "stats url",
      mockPrMessage = "pr message",
      mockRequest = {
        'payload': {
          'pull_request': {
            'statuses_url': statsUrl,
            'title': mockPrMessage
          }
        }
      },
      mockForm = {};
  
  promiseStub.then.callsArgWith(0, mockPrMessage);
  buildFormStub.withArgs(mockPrMessage).returns(mockForm);

  postHandler(mockRequest);

  it('should make post call with statuses url', function() {
    assert.calledWith(requestStub.post, match({'url': statsUrl + '?access_token=' + mockConfigs.accessToken}));
  });

  it('should set post headers with user-agent property', function() {
    assert.calledWith(requestStub.post, match({headers: match({'User-Agent': 'Commit Message Validator'})}));
  });

  it('should set form from formBuilder', function() {
    assert.calledWith(requestStub.post, match({'form': mockForm}));
  });
});