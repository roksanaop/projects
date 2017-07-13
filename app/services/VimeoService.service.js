(function() {
  'use strict';

  angular
    .module('videoApp')
    .service('VimeoService', class VimeoService {
      constructor($http, VideoService) {
        this.$http = $http;
        this.VideoService = VideoService;
      }

      search(id) {
        var key = '67b663ff016d5f5e7e628af3ebee3bb6';
        var url = 'https://api.vimeo.com/videos/' + id + '?name&access_token=' + key;
        return this.$http.get(url)
          .then((response) => {
            this.VideoService.addVideo(this.prepareData(response));
            //console.log('Add vimeo');
          });
      }

      prepareData(data) {
        let video = data.data;
        return this.videoData = {
          id: video.uri.slice(-9),
          title: video.name,
          viewCount: video.stats.plays,
          likeCount: video.metadata.connections.likes.total,
          thumbnail: video.pictures.sizes[3].link,
          date: new Date(),
          favourite: false,
          embed: video.embed.html
        }

      }

    });

})();