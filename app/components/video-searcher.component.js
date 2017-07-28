(function() {
  'use strict';

  angular
    .module('videoApp')
    .component('videoSearcher', {
      templateUrl: 'app/templates/video-searcher.template.html',
      controller: 'VideoSearcherCtrl'
    });

})();