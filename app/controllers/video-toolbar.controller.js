(function() {
  'use strict';

  class VideoToolbarCtrl {
    constructor(StorageService, VideoService, FilterService) {
      Object.assign(this, {StorageService, VideoService, FilterService});
    }

    showFavourites(videoArray) {
      this.options.currentPage = 0;
      this.options.onlyFavourites = true;
      let favArray = this.FilterService.onlyFavourites(videoArray);
      this.videos.length = 0;
      return favArray.map(val => {
        this.videos.push(val);
      });
    }
    
    showAll() {
      this.options.currentPage = 0;
      this.options.onlyFavourites = false;
      this.videos.length = 0;
      return this.StorageService.get('videos').then(videos => {
        JSON.parse(JSON.stringify(videos)).map(val => {
          this.videos.push(val);
          //console.log(angular.copy(this.videos));
        });
      });
    }

    removeAll() {
      this.options.currentPage = 0;
      let videosLength = this.videos.length;
      this.StorageService.remove('videos').catch(() => new Error('Error! Can\'t remove'));
      return this.videos.splice(0, videosLength);
    }

    loadDemoVideos() {
      let demoYTVideos = ['https://www.youtube.com/watch?v=4JOAqRS_lms', 'https://youtu.be/vJ3a_AuEW18', 'https://vimeo.com/203494889', 'hO7mzO83N1Q', '-kYYuKbxa30', 'https://www.youtube.com/watch?v=rrDD5NTnoU4'];
      demoYTVideos.map(val => {
        this.VideoService.add(val).then((videoData) => {
          if (!videoData) { return; }
          this.videos.push(videoData);
          return this.StorageService.add('videos', videoData);
        });
      });
    }

    prevPage(currentPage, currentPageSize, onlyFavourites, videosArr) {
      if (currentPage > this.numberOfPages(currentPageSize, onlyFavourites, videosArr)) {
        currentPage = this.numberOfPages(currentPageSize, onlyFavourites, videosArr);
      }
      return this.options.currentPage--;
    }

    nextPage() {
      return this.options.currentPage++;
    }

    numberOfPages(currentPageSize, onlyFavourites, videosArr) {
      return this.FilterService.numberOfPages(currentPageSize, onlyFavourites, videosArr);
    }
    
  }

  angular
    .module('videoApp')
    .controller('VideoToolbarCtrl', VideoToolbarCtrl);

})();
