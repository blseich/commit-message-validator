var validateMessage = require('../lib/commit-message-validator'),
    configs = require('../lib/configs');

module.exports = function(message) {
  var state = validateMessage(message),
      description = state === 'success' ? configs.successMessage : configs.failureMessage;
  return {
    state: state,
    context: 'Commit Message Validator',
    description: description
  }
};