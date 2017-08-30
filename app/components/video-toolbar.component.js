(function() {
  'use strict';

  angular
    .module('videoApp')
    .component('videoToolbar', {
      templateUrl: 'app/templates/video-toolbar.template.html',
      controller: 'VideoToolbarCtrl',
      bindings: {
        options: '<',
        videos: '<',
        temporaryVideos: '<'
      }
    });

})();
