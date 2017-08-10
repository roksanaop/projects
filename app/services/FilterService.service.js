(function() {
  'use strict';

  class FilterService {
    constructor(VideoService) {
      Object.assign(this, {VideoService});
      this.videos = this.VideoService.get('videos');
    }

    onlyFavourites() {
      this.fav = this.videos.filter(val => {return val.favourite;});
      this.videos.length = 0;
      this.fav.map(val => {this.videos.push(val);});      
      return this.videos;
    }

    numberOfPages(currentPageSize, onlyFavourites) {
      let numberPages = Math.ceil(this.videos.length/currentPageSize);

      if (onlyFavourites) {
        numberPages = Math.ceil(this.onlyFavourites().length/currentPageSize);
      }
      return numberPages || 1;
    }

  }

  angular
    .module('videoApp')
    .service('FilterService', FilterService);

})();
