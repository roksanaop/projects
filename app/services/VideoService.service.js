(function() {
  'use strict';

  class VideoService {
    constructor(YouTubeService, VimeoService, $mdDialog) {
      Object.assign(this, {YouTubeService, VimeoService, $mdDialog});
    }

    add(link) {
      let youtubeRegExp = /(\bhttps:\/\/(www.)?youtu.?be(.com)?\/(watch\?v=)?)?([^"&.?\/ \s]{11})\b/;
      let vimeoRegExp = /\bhttps:\/\/vimeo.com\/\w{9}\b/;
      if (youtubeRegExp.exec(link)) {
        return this.YouTubeService.search(link.slice(-11));
      }
      if (vimeoRegExp.exec(link)) {
        return this.VimeoService.search(link.slice(-9));
      }

      alert('Please, add valid link');
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
