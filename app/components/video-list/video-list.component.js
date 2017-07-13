(function() {
  'use strict';

  angular
    .module('videoApp')
    .component('videoList', {
      templateUrl: 'app/components/video-list/video-list.template.html',
      controller: 'VideoListCtrl',
      controllerAs: 'app'
    });

})();