(function() {
  'use strict';

  angular
    .module('videoApp')
    .controller('VideoToolbarCtrl', class VideoToolbarCtrl {
      constructor(StorageService, VideoService, VideoSearcherService) {
        this.StorageService = StorageService;
        this.VideoService = VideoService;
        this.videos = this.VideoService.videos;
        this.options = this.VideoService.options;
        this.VideoSearcherService = VideoSearcherService;
        this.temporaryVideos = this.VideoService.videos || [];
      }

      onlyFavourites() {
        this.options.onlyFavourites = true;
        this.videos = this.videos.filter((vid) => {
          return vid.favourite;
        });
        this.StorageService.set('favvideos', this.videos);
        //console.log(this.StorageService.get('favvideos'));
      }

      showAll() {
        this.options.currentPage = 0;
        this.options.onlyFavourites = false;
        this.StorageService.set('videos', this.temporaryVideos);
        //console.log(this.StorageService.get('videos'));
      }

      removeAll() {
        this.options.currentPage = 0;
        let videosLength = this.videos.length;
        this.videos.splice(0, videosLength);
        this.StorageService.set('videos', this.videos);
        //console.log(this.videos);
      }

      loadDemoVideos() {
        let demoVideos = ['https://www.youtube.com/watch?v=4JOAqRS_lms', 'https://youtu.be/vJ3a_AuEW18', 'https://vimeo.com/203494889', 'hO7mzO83N1Q', '-kYYuKbxa30'];
        demoVideos.map((val) => {this.VideoSearcherService.searchVideo(val)});
      }

      numberOfPages() {
        let numberPages = Math.ceil(this.videos.length/this.options.currentPageSize);

        if (this.options.onlyFavourites) {
          let favVideosLength = this.videos.filter((vid) => {
            return vid.favourite;
          }).length;

          numberPages = Math.ceil(favVideosLength/this.options.currentPageSize);
        }

        return numberPages || 1;
      }

      prevPage() {
        return this.options.currentPage--;
      }

      nextPage() {
        return this.options.currentPage++;
      }
      
    });

})();