(function() {
  'use strict';

  class FilterService {

    onlyFavourites(videosArray) {
      return videosArray.filter(val => {return val.favourite});
    }

    numberOfPages(currentPageSize, onlyFavourites, videosArray) {
      let numberPages = Math.ceil(videosArray.length/currentPageSize);

      if (onlyFavourites) {
        numberPages = Math.ceil(this.onlyFavourites(videosArray).length/currentPageSize);
      }
      return numberPages || 1;
    }

  }

  angular
    .module('videoApp')
    .service('FilterService', FilterService);

})();
