(function() {
  'use strict';

  class TweetGraphsCtrl {
    constructor($timeout, MapGraphService) {
      Object.assign(this, {$timeout, MapGraphService});
    }

    $onInit() {
      this.$timeout(() => {
        this.MapGraphService.drawMap();
      }, 2000);
    }
  }

  angular
    .module('twitterApp')
    .controller('TweetGraphsCtrl', TweetGraphsCtrl);

})();