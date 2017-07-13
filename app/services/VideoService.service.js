(function() {
  'use strict';

  angular
    .module('videoApp')
    .service('VideoService', class VideoService {
      constructor(StorageService) {
        this.StorageService = StorageService;
        this.videos = this.StorageService.get('videos') || []; 
        this.options = {
          pageSizes: [5, 10, 20, 50, 100],
          currentPageSize: 5,
          currentPage: 0,
          display: 'list',
          orderProp: '-date',
          onlyFavourites: false
        }
      }

      addVideo(video) {
        this.videos.push(video);
        this.StorageService.set('videos', this.videos);
        //console.log(video.date);
      }
      
    });

})();