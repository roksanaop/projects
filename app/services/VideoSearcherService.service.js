(function() {
  'use strict';

  angular
    .module('videoApp')
    .service('VideoSearcherService', class VideoSearcherService {
      constructor(YouTubeService, VimeoService) {
        this.YouTubeService = YouTubeService;
        this.VimeoService = VimeoService;
      }
      
      searchVideo(link) {
        var youtubeRegExp = /(\bhttps:\/\/(www.)?youtu.?be(.com)?\/(watch\?v=)?)?([^"&?\/ \s]{11})\b/;
        var vimeoRegExp = /\bhttps:\/\/vimeo.com\/\w{9}\b/;
        if (youtubeRegExp.exec(link)) {
          return this.YouTubeService.search(link.slice(-11));
        }
        if (vimeoRegExp.exec(link)) {
          return this.VimeoService.search(link.slice(-9))
        }

        alert('Add valid link');
      }
      
    });

})();