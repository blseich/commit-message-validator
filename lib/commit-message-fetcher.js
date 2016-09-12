var requestAPI = require('request'),
    extractMessages = require('../lib/commit-message-extractor');
    

module.exports = function(commitsUrl) {
  return new Promise(function(resolve, reject) {
    requestAPI.get({
      url: commitsUrl,
      headers: {
        'User-Agent': 'Commit Message Validator'
      }
    }, function(err, response, body) {
      resolve(extractMessages(JSON.parse(body)));
    });
  });

};  