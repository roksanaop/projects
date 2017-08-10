(function() {
  'use strict';

  class VideoToolbarCtrl {
    constructor(StorageService, VideoService, FilterService) {
      Object.assign(this, {StorageService, VideoService, FilterService});
      this.videos = this.VideoService.get('videos');
      this.temporaryVideos = this.VideoService.get('temporaryVideos');
    }

    onlyFavourites() {
      this.options.currentPage = 0;
      this.options.onlyFavourites = true;
      //console.log(this.videos);
      return this.FilterService.onlyFavourites();
    }
    
    showAll() {
      this.options.currentPage = 0;
      this.options.onlyFavourites = false;
      this.videos.length = 0;
      this.temporaryVideos.map(val => {this.videos.push(val);});
      return this.videos;
    }

    removeAll() {
      this.options.currentPage = 0;
      let videosLength = this.videos.length;
      this.StorageService.remove('videos')
        .then(null, error => {console.log(error);});
      this.videos.splice(0, videosLength);
      this.temporaryVideos.splice(0, videosLength);
      //console.log(this.videos);
    }

    loadDemoVideos() {
      let demoYTVideos = ['https://www.youtube.com/watch?v=4JOAqRS_lms', 'https://youtu.be/vJ3a_AuEW18', 'https://vimeo.com/203494889', 'hO7mzO83N1Q', '-kYYuKbxa30', 'https://www.youtube.com/watch?v=rrDD5NTnoU4'];
      demoYTVideos.map(val => {this.VideoService.search(val)});
    }

    prevPage(currentPage, currentPageSize, onlyFavourites) {
      if (currentPage > this.numberOfPages(currentPageSize, onlyFavourites)) {
        currentPage = this.numberOfPages(currentPageSize, onlyFavourites);
      }
      return this.options.currentPage--;
    }

    nextPage() {
      return this.options.currentPage++;
    }

    numberOfPages(currentPageSize, onlyFavourites) {
      return this.FilterService.numberOfPages(currentPageSize, onlyFavourites);
    }
    
  }

  angular
    .module('videoApp')
    .controller('VideoToolbarCtrl', VideoToolbarCtrl);

})();
