(function() {
  'use strict';

  angular
    .module('twitterApp')
    .component('tweetGraphs', {
      templateUrl: 'templates/tweet-graphs.template.html',
      bindings: {
        data: '<'
      }
    });

})();
