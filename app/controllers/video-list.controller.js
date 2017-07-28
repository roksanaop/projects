(function() {
  'use strict';

  class VideoListCtrl {
    constructor(StorageService, VideoService) {
      Object.assign(this, {StorageService, VideoService});
      this.videos = this.VideoService.videos;
      this.temporaryVideos = this.VideoService.temporaryVideos;
      this.options = this.VideoService.options;
    }

    watchVideo(video) {
      this.VideoService.modal(video);
    }

    deleteVideo(video) {
      let videoIndex = this.videos.indexOf(video);
      this.StorageService.remove('videos');
      this.videos.splice(videoIndex, 1);
      this.temporaryVideos.splice(videoIndex, 1);
      this.StorageService.set('videos', this.videos);
    }

    addToFavourites(video) {
      video.favourite = !video.favourite;
      this.StorageService.set('videos', this.videos);
    }

    paginationFilter() {
      return (this.options.currentPage * this.options.currentPageSize); 
    }
      
  }

  angular
    .module('videoApp')
    .controller('VideoListCtrl', VideoListCtrl);

})();