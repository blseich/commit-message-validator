var validateMessages = require('../lib/commit-message-validator'),
    configs = require('../lib/configs');

module.exports = function(commits) {
  var state = validateMessages(commits),
      description = state === 'success' ? configs.successMessage : configs.failureMessage;
  return {
    state: state,
    context: 'Commit Message Validator',
    description: description
  }
};