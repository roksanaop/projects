angular
  .module('videoApp')
  .config(['$locationProvider', '$routeProvider', 
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('videos', {
          template: '<video-searcher></video-searcher>'
        })
        //.when('/videos/list', {
        //  template: '<video-list></video-list>'
        //})
        .otherwise('videos');
    }
  ]);