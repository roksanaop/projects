(function() {
  'use strict';

  class VimeoService {
    constructor($http) {
      Object.assign(this, {$http});
    }

    search(id, callback) {
      var key = '67b663ff016d5f5e7e628af3ebee3bb6';
      var url = 'https://api.vimeo.com/videos/' + id + '?name&access_token=' + key;
      return this.$http.get(url)
        .then(value => {callback(this.prepareData(value));
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
        embed: '<iframe src="https://player.vimeo.com/video/' + video.uri.slice(-9) + '?badge=0&autopause=0&player_id=0" width="640" height="360" frameborder="0" title="Syd Barrett - Effervescing Elephant" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        //embed: video.embed.html
      }
    }

  }

  angular
    .module('videoApp')
    .service('VimeoService', VimeoService);

})();
