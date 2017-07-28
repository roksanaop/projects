(function() {
  'use strict';

  class StorageService {

    get(keyValue) {
      return new Promise(resolve => {
        let videoArr = localStorage.getItem(keyValue);
        resolve(JSON.parse(videoArr));
      });
    }

    set(keyName, keyValue) {
      return new Promise(resolve => {
        resolve(localStorage.setItem(keyName, JSON.stringify(keyValue)));
      });
    }

    remove(keyName) {
      return new Promise(resolve => {
        resolve(localStorage.removeItem(keyName));
      });
    }

  }

  angular
    .module('videoApp')
    .service('StorageService', StorageService);

})();
