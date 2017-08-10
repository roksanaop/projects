(function() {
  'use strict';

  class VideoListCtrl {
    constructor(StorageService, VideoService) {
      Object.assign(this, {StorageService, VideoService});
      this.videos = this.VideoService.get('videos');
      this.temporaryVideos = this.VideoService.get('temporaryVideos');
      this.options = {
        pageSizes: [5, 10, 20, 50, 100],
        currentPageSize: 5,
        currentPage: 0,
        display: 'list',
        orderProp: 'title',
        onlyFavourites: false
      }
    }

    watch(video) {
      this.VideoService.modal(video);
    }

    remove(video) {
      if (this.options.onlyFavourites) {
        let videoIndexTemp = this.temporaryVideos.indexOf(video);
        this.StorageService.remove('videos');
        this.temporaryVideos.splice(videoIndexTemp, 1);
        let videoIndex = this.videos.indexOf(video);
        this.videos.splice(videoIndex, 1);
        return this.StorageService.set('videos', this.temporaryVideos);
      }
      let videoIndex = this.videos.indexOf(video);
      this.StorageService.remove('videos');
      this.videos.splice(videoIndex, 1);
      this.temporaryVideos.splice(videoIndex, 1);
      this.StorageService.set('videos', this.temporaryVideos);
    }

    addToFavourites(video) {
      if (this.options.onlyFavourites) {
        let videoIndex = this.temporaryVideos.indexOf(video);
        video.favourite = !video.favourite;
        this.StorageService.remove('videos');
        this.temporaryVideos.splice(videoIndex, 1, video);
        return this.StorageService.set('videos', this.temporaryVideos);
      }
      video.favourite = !video.favourite;
      this.StorageService.set('videos', this.videos);
    }

    paginationFilter(current, size) {
      return current * size; 
    }
      
  }

  angular
    .module('videoApp')
    .controller('VideoListCtrl', VideoListCtrl);

})();
