var _ = require('underscore'),
    configs = require('../lib/configs');

module.exports = function(messages) {
  var regex = configs.regex;

  function _checkMessages(bool, message) {
    return bool && regex.test(message);
  }

  return _.reduce(messages, _checkMessages, true) ? 'success' : 'failure';
};