(function() {
  'use strict';

  angular
    .module('videoApp')
    .controller('ModalWindowCtrl', class ModalWindowCtrl {
      constructor($mdDialog, $sce, video) {
        this.$mdDialog = $mdDialog;
        this.$sce = $sce;
        this.video = video;
      }

      embed() {
        return this.$sce.trustAsHtml(this.video.embed);
      }

      backToMain() {
        this.$mdDialog.hide();
      }

    });

})();