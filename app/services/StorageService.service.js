(function() {
  'use strict';

  angular
    .module('videoApp')
    .service('StorageService', class StorageService {
      
      get(keyValue) {
        var videoArr = localStorage.getItem(keyValue);
        //console.log(videoArr);
        return JSON.parse(videoArr);
      }

      set(keyName, keyValue) {
        return localStorage.setItem(keyName, JSON.stringify(keyValue));
      }

    });

})();