(function() {
  'use strict';

  angular
    .module('videoApp')
    .controller('VideoListCtrl', class VideoListCtrl {
      constructor(StorageService, VideoService, $mdDialog) {
        this.StorageService = StorageService;
        this.VideoService = VideoService;
        this.videos = this.VideoService.videos;
        this.options = this.VideoService.options;
        this.$mdDialog = $mdDialog;
      }

      watchVideo(video) {
        //console.log(video);
        return this.$mdDialog.show({
          templateUrl: 'app/controllers/modal-window/modal-window.template.html',
          controller: 'ModalWindowCtrl',
          controllerAs: 'app',
          parent: angular.element(document.body),
          preserveScope: true,
          locals: {
            video: video
          },
          clickOutsideToClose: true
        });
      }

      deleteVideo(video) {
        let videoIndex = this.videos.indexOf(video);
        this.videos.splice(videoIndex, 1);
        this.StorageService.set('videos', this.videos);
      }

      addToFavourites(video) {
        video.favourite = !video.favourite;
        //console.log(video);
        this.StorageService.set('videos', this.videos);
      }

      paginationFilter() {
        return this.options.currentPage * this.options.currentPageSize; 
      }
      
    });

})();