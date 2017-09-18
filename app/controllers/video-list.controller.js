(function() {
  'use strict';

  class VideoListCtrl {
    constructor(StorageService, VideoService) {
      Object.assign(this, {StorageService, VideoService});
      this.StorageService.get('videos').then(videos => {
        this.videos = JSON.parse(JSON.stringify(videos)) || [];
      });
      this.options = {
        pageSizes: [5, 10, 20, 50, 100],
        currentPageSize: 5,
        currentPage: 0,
        display: 'list',
        orderProp: 'title',
        onlyFavourites: false
      }
    }
    
    add(link) {
      this.VideoService.add(link).then((videoData) => {
        if (!videoData) { return; }
        this.videos.push(videoData);
        return this.StorageService.add('videos', videoData);
      });
    }

    watch(video) {
      this.VideoService.modal(video);
    }

    remove(video) {
      let videoIndex = this.videos.indexOf(video);
      this.videos.splice(videoIndex, 1);
      return this.StorageService.remove('videos', video);
    }

    addToFavourites(video) {
      video.favourite = !video.favourite;
      //console.log(angular.copy(this.videos));
      return this.StorageService.update('videos', video);
    }

    paginationFilter(current, size) {
      return current * size; 
    }
      
  }

  angular
    .module('videoApp')
    .controller('VideoListCtrl', VideoListCtrl);

})();
