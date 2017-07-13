(function() {
  'use strict';

  angular
    .module('videoApp')
    .controller('VideoSearcherCtrl', class VideoSearcherCtrl {
      constructor(VideoSearcherService) {
        this.VideoSearcherService = VideoSearcherService;
      }

      searchVideo(link) {
        this.VideoSearcherService.searchVideo(link);
      }

    });

})();