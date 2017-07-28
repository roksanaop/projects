(function() {
  'use strict';

  class VideoSearcherCtrl {
    constructor(VideoService) {
      Object.assign(this, {VideoService});
    }

    searchVideo(link) {
      this.VideoService.search(link);
    }

  }

  angular
    .module('videoApp')
    .controller('VideoSearcherCtrl', VideoSearcherCtrl);

})();