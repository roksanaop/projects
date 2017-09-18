(function() {
  'use strict';

  angular
    .module('videoApp')
    .component('videoList', {
      templateUrl: 'app/templates/video-list.template.html',
      controller: 'VideoListCtrl'
    });

})();