var _ = require('underscore');

module.exports = function(commits) {
  return _.chain(commits)
          .pluck('commit')
          .pluck('message')
          .value();
}