(function() {
  'use strict';

  angular
    .module('videoApp')
    .component('videoToolbar', {
      templateUrl: 'app/components/video-toolbar/video-toolbar.template.html',
      controller: 'VideoToolbarCtrl',
      controllerAs: 'app'
    });

})();