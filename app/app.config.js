(function() {

  'use strict';

  angular
    .module('videoApp')
    .config(['$stateProvider', '$urlRouterProvider',
      function config($stateProvider, $urlRouterProvider) {

        $stateProvider
          .state('videos', {
            url: '/videos',
            template: '<video-searcher></video-searcher><video-list></video-list>'
          });
        $urlRouterProvider.otherwise('/videos');

      }
    ]);

})();
