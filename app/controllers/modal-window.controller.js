(function() {
  'use strict';

  class ModalWindowCtrl {
    constructor($mdDialog, $sce, video) {
      Object.assign(this, {$mdDialog, $sce, video});
    }

    embed() {
      return this.$sce.trustAsHtml(this.video.embed);
    }

    backToMain() {
      this.$mdDialog.hide();
    }

  }

  angular
    .module('videoApp')
    .controller('ModalWindowCtrl', ModalWindowCtrl);

})();