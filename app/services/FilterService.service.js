(function() {
  'use strict';

  class FilterService {
    constructor(VideoService) {
      Object.assign(this, {VideoService});
      this.videos = this.VideoService.videos;
      this.options = this.VideoService.options;
    }

    onlyFavourites() {
      this.options.currentPage = 0;
      this.options.onlyFavourites = true;
      this.fav = this.videos.filter(val => {return val.favourite;});
      this.videos.length = 0;
      this.fav.map(val => {this.videos.push(val);});      
      return this.videos;
    }

    numberOfPages() {
      let numberPages = Math.ceil(this.videos.length/this.options.currentPageSize);

      if (this.options.onlyFavourites) {
        numberPages = Math.ceil(this.onlyFavourites().length/this.options.currentPageSize);
      }
      return numberPages || 1;
    }

  }

  angular
    .module('videoApp')
    .service('FilterService', FilterService);

})();