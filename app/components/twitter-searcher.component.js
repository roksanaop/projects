(function() {
  'use strict';

  angular
    .module('twitterApp')
    .component('twitterSearcher', {
      templateUrl: 'templates/twitter-searcher.template.html',
      controller: 'TwitterSearcherCtrl'
    });

})();