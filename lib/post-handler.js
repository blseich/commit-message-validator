var requestAPI = require('request'),
    buildForm = require('../lib/form-builder'),
    configs = require('../lib/configs');

var accessToken = '?access_token=' + configs.accessToken;

module.exports = function(request, reply) {
  function _postStatus(prMessage) {
    requestAPI.post({
      url: request.payload.pull_request.statuses_url + accessToken,
      headers: {
        'User-Agent': 'Commit Message Validator'
      },
      form: JSON.stringify(buildForm(prMessage))
    }, function(err, htmlResponse, body) {
      console.log('-----------------------------------');
      console.log("Err: " + err + "\n");
      console.log("HTMLResponse: " + htmlResponse + "\n");
      console.log("Body: " + body);
      console.log('-----------------------------------');
    });
  }

  _postStatus(request.payload.pull_request.title);
}