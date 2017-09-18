(function() {
  'use strict';

  class YouTubeService {
    constructor($http) {
      Object.assign(this, {$http});
    }

    search(id) {
      var key = 'AIzaSyAG_j5vdipqwk28k2ozPLDqvb4cDAdMJHY';
      var url = 'https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=' + id + '&key=' + key;
      return this.$http.get(url).then(value => {
        //console.log('Add youtube');
        return this.prepareData(value);
      }).catch(() => alert('This video doesn\'t exist. Try again!'));
    }

    prepareData(data) {
      let video = data.data.items[0];
      return this.videoData = {
        id: video.id,
        title: video.snippet.title,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        thumbnail: video.snippet.thumbnails.high.url,
        date: new Date(),
        favourite: false,
        embed: '<iframe id="player" type="text/html" width="640" height="360" src="http://www.youtube.com/embed/' + video.id + '" frameborder="0" allowfullscreen></iframe>'
      }
    }
    
  }

  angular
    .module('videoApp')
    .service('YouTubeService', YouTubeService);

})();
