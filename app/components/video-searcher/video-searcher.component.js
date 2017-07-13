(function() {
  'use strict';

  angular
    .module('videoApp')
    .component('videoSearcher', {
      templateUrl: 'app/components/video-searcher/video-searcher.template.html',
      controller: 'VideoSearcherCtrl',
      controllerAs: 'app'
    });

})();
