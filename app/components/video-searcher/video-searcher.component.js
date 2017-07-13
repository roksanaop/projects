(function() {
  'use strict';

  angular
    .module('videoApp')
    .component('videoSearcher', {
      templateUrl: 'app/components/video-searcher/video-searcher.template.html',
      controller: 'VideoSearcherCtrl',
      controllerAs: 'app'
//const APIkey = "AIzaSyAG_j5vdipqwk28k2ozPLDqvb4cDAdMJHY";
//<iframe id="player" type="text/html" width="640" height="360" src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com" frameborder="0"></iframe>
    });

})();