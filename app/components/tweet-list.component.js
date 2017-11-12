(function() {
  'use strict';

  angular
    .module('twitterApp')
    .component('tweetList', {
      templateUrl: 'templates/tweet-list.template.html',
      bindings: {
        tweets: '<'
      }
    });

})();
