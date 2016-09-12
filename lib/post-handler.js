var requestAPI = require('request'),
    buildForm = require('../lib/form-builder'),
    fetchCommitMessages = require('../lib/commit-message-fetcher'),
    configs = require('../lib/configs');

var accessToken = '?access_token=' + configs.accessToken;

module.exports = function(request, reply) {
  function _postStatus(commits) {
    requestAPI.post({
      url: request.payload.pull_request.statuses_url + accessToken,
      headers: {
        'User-Agent': 'Commit Message Validator'
      },
      form: JSON.stringify(buildForm(commits))
    }, function(err, htmlResponse, body) {
      console.log('-----------------------------------');
      console.log("Err: " + err + "\n");
      console.log("HTMLResponse: " + htmlResponse + "\n");
      console.log("Body: " + body);
      console.log('-----------------------------------');
    });
  }

  fetchCommitMessages(request.payload.pull_request.commits_url + accessToken).then(_postStatus);
}