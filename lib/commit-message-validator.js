var _ = require('underscore'),
    configs = require('../lib/configs');

module.exports = function(message) {
  var regex = configs.regex;

  return  regex.test(message) ? 'success' : 'failure';
};