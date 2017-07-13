(function() {

  'use strict';

  angular
    .module('videoApp')
    .config(['$locationProvider', '$routeProvider', 
      function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
          .when('videos', {
            template: '<video-searcher></video-searcher>'
          })
          .when('/videos/modal', {
            templateUrl: 'app/controllers/modal-window/modal-window.template.html'
          })
          .otherwise('videos');
      }
    ]);

})();
