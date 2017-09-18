(function() {
  'use strict';

  angular
    .module('videoApp')
    .filter('paginationFilter', function paginationFilter() {
      return function(input, start) {
        start = +start;
        //console.log(input.slice(start));
        return input.slice(start);
      };

    });

})();