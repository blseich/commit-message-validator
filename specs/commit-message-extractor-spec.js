var expect = require('chai').expect;

var extractCommitMessages = require('../lib/commit-message-extractor')

describe('Commit Message Extractor', function() {
  var data = [
    {
      commit: {
        message: 'first'
      }
    },
    {
      commit: {
        message: 'second'
      }
    }
  ];

  it('should produce array of messages', function() {
    expect(extractCommitMessages(data)).to.include('first');
    expect(extractCommitMessages(data)).to.include('second');
  });

});