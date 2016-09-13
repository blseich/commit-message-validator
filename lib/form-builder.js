var validateMessage = require('../lib/commit-message-validator'),
    configs = require('../lib/configs');

module.exports = function(message) {
  var state = validateMessage(message),
      description = state === 'success' ? configs.successMessage : configs.failureMessage;
  return {
    state: state,
    context: 'Commit Message Validator',
    description: description,
    target_url: 'http://10.9.138.177:7000'
  }
};