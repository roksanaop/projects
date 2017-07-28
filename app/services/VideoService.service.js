(function() {
  'use strict';

  class VideoService {
    constructor(StorageService, YouTubeService, VimeoService, $mdDialog) {
      Object.assign(this, {StorageService, YouTubeService, VimeoService, $mdDialog});
      this.StorageService.get('videos')
        .then(value => {this.videos = value || []});
      this.StorageService.get('videos')
        .then(value => {this.temporaryVideos = value || []}); //variable created for button SHOW ALL after filtering this.videos - ONLY FAV
      this.options = {
        pageSizes: [5, 10, 20, 50, 100],
        currentPageSize: 5,
        currentPage: 0,
        display: 'list',
        orderProp: 'title',
        onlyFavourites: false
      }
    }

    search(link) {
      let youtubeRegExp = /(\bhttps:\/\/(www.)?youtu.?be(.com)?\/(watch\?v=)?)?([^"&.?\/ \s]{11})\b/;
      let vimeoRegExp = /\bhttps:\/\/vimeo.com\/\w{9}\b/;
      if (youtubeRegExp.exec(link)) {
        return this.YouTubeService.search(link.slice(-11), val => {this.add(val)});
      }
      if (vimeoRegExp.exec(link)) {
        return this.VimeoService.search(link.slice(-9), val => {this.add(val)});
      }

      alert('Please, add valid link');
    }

    add(video) {
      this.videos.push(video);
      this.temporaryVideos.push(video);
      this.StorageService.set('videos', this.videos);
      //console.log(this.videos);
    }

    modal(video) {
      this.$mdDialog.show({
        templateUrl: 'app/templates/modal-window.template.html',
        controller: 'ModalWindowCtrl',
        controllerAs: 'modal',
        parent: angular.element(document.body),
        preserveScope: true,
        locals: {
          video: video
        },
        clickOutsideToClose: true
      });
    }

  }

  angular
    .module('videoApp')
    .service('VideoService', VideoService);

})();
