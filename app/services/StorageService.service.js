(function() {
  'use strict';

  class StorageService {

    constructor ($interval) {
      Object.assign(this, {$interval});
    }

    get(keyName) {
      return new Promise((resolve, reject) => {
        this.$interval(() => {
          let videoArr = localStorage.getItem(keyName);
          resolve(JSON.parse(videoArr));
          reject(new Error('This keyName does not exist, try with different keyName'));
        }, 500);
      });
    }

    set(keyName, keyValue) {
      return new Promise((resolve, reject) => {
        this.$interval(() => {
          let setArray = localStorage.setItem(keyName, JSON.stringify(keyValue));
          let videoArr = localStorage.getItem(keyName);
          resolve(JSON.parse(videoArr));
          reject(new Error('Error! Failed setting'));
        }, 500);
      });
    }

    remove(keyName) {
      return new Promise((resolve, reject) => {
        this.$interval(() => {
          let removeArray = localStorage.removeItem(keyName);
          let videoArr = localStorage.getItem(keyName);
          resolve(JSON.parse(videoArr));
          reject(new Error('Error! Failed removing'));
        }, 500);
      });
    }

  }

  angular
    .module('videoApp')
    .service('StorageService', StorageService);

})();
