(function() {
  'use strict';

  class VideoListCtrl {
    constructor(StorageService, VideoService) {
      Object.assign(this, {StorageService, VideoService});
      this.StorageService.get('videos').then(videos => {
        this.videos = JSON.parse(JSON.stringify(videos)) || [];
      });
      this.StorageService.get('videos').then(videos => {
        this.temporaryVideos = JSON.parse(JSON.stringify(videos)) || []; //variable created for button SHOW ALL after filtering this.videos - ONLY FAV
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
        if (!videoData) {return;}
        this.videos.push(videoData);
        this.temporaryVideos = [];
        this.videos.map(val => {
          this.temporaryVideos.push(val);
        });
        return this.StorageService.set('videos', this.videos);
      });
    }

    watch(video) {
      this.VideoService.modal(video);
    }

    remove(video) {
      let videoIndex = this.videos.indexOf(video);
      this.videos.splice(videoIndex, 1);
      this.temporaryVideos = [];
      this.videos.map(val => {
        this.temporaryVideos.push(val);
      });
      return this.StorageService.set('videos', this.videos);
    }

    addToFavourites(video) {
      video.favourite = !video.favourite;
      this.temporaryVideos = [];
      this.videos.map(val => {
        this.temporaryVideos.push(val);
      });
      //console.log(angular.copy(this.videos));
      return this.StorageService.set('videos', this.videos);
    }

    paginationFilter(current, size) {
      return current * size; 
    }
      
  }

  angular
    .module('videoApp')
    .controller('VideoListCtrl', VideoListCtrl);

})();
