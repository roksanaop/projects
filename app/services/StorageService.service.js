(function() {
  'use strict';

  class StorageService {

    get(keyValue) {
      return new Promise((resolve, reject) => {
        let videoArr = localStorage.getItem(keyValue);
        resolve(JSON.parse(videoArr));
        reject(new Error('This keyValue does not exist, try with different keyValue'));
      });
    }

    set(keyName, keyValue) {
      return new Promise((resolve, reject) => {
        resolve(localStorage.setItem(keyName, JSON.stringify(keyValue)));
        reject(new Error('Error! Failed setting'));
      });
    }

    remove(keyName) {
      return new Promise((resolve, reject) => {
        resolve(localStorage.removeItem(keyName));
        reject(new Error('Error! Failed removing'));
      });
    }

  }

  angular
    .module('videoApp')
    .service('StorageService', StorageService);

})();
