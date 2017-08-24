(function() {
  'use strict';

  class StorageService {

    constructor ($timeout) {
      Object.assign(this, {$timeout});
    }

    get(keyValue) {
      return new Promise((resolve, reject) => {
        this.$timeout(() => {
          let videoArr = localStorage.getItem(keyValue);
          resolve(JSON.parse(videoArr));
          reject(new Error('This keyValue does not exist, try with different keyValue'));
        }, 1000);
      });
    }

    set(keyName, keyValue) {
      return new Promise((resolve, reject) => {
        this.$timeout((resolve, reject) => {
          let setArray = localStorage.setItem(keyName, JSON.stringify(keyValue));
          let videoArr = localStorage.getItem(keyValue);
          resolve(JSON.parse(videoArr));
          reject(new Error('Error! Failed setting'));
        }, 1000);
      });
    }

    remove(keyName) {
      return new Promise((resolve, reject) => {
        this.$timeout(() => {
          resolve(localStorage.removeItem(keyName));
          reject(new Error('Error! Failed removing'));
        }, 1000);
      });
    }

  }

  angular
    .module('videoApp')
    .service('StorageService', StorageService);

})();
