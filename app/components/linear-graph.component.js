(function() {
  'use strict';

  angular
    .module('twitterApp')
    .component('linearGraph', {
      template: `<div id="linear"></div>`,
      controller: 'LinearGraphCtrl',
      bindings: {
        linearData: '<'
      }
    });

})();