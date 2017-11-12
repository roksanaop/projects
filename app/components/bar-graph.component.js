(function() {
  'use strict';

  angular
    .module('twitterApp')
    .component('barGraph', {
      template: `<div id="bar"></div>`,
      controller: 'BarGraphCtrl',
      bindings: {
        barData: '<'
      }
    });

})();