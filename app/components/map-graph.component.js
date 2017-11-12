(function() {
  'use strict';

  angular
    .module('twitterApp')
    .component('mapGraph', {
      template: `<div id="map"></div>`,
      controller: 'MapGraphCtrl',
      bindings: {
        mapData: '<',
        barData: '<'
      }
    });

})();