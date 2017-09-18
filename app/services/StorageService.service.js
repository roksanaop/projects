(function() {
  'use strict';

  class StorageService {

    constructor ($q) {
      Object.assign(this, {$q});
    }

    get(keyName) {
      return this.$q((resolve, reject) => {
        setTimeout(() => {
          resolve(JSON.parse(localStorage.getItem(keyName)));
          reject(new Error('This keyName does not exist, try with different keyName'));
        }, 500);
      });
    }

    add(keyName, videoData) {
      return this.$q((resolve, reject) => {
        setTimeout(() => {
          let currentArr = JSON.parse(localStorage.getItem(keyName)) || [];
          currentArr.push(videoData);
          localStorage.setItem(keyName, JSON.stringify(currentArr));
          resolve(JSON.parse(localStorage.getItem(keyName)));
          reject(new Error('Error! Failed adding'));
        }, 500);
      });
    }

    update(keyName, video) {
      return this.$q((resolve, reject) => {
        setTimeout(() => {
          let currentArr = JSON.parse(localStorage.getItem(keyName)) || [];
          let index = currentArr.findIndex(vid => vid.id === video.id);
          currentArr.splice(index, 1, video);
          localStorage.setItem(keyName, JSON.stringify(currentArr));
          resolve(JSON.parse(localStorage.getItem(keyName)));
          reject(new Error('Error! Failed updating'));
        }, 500);
      });
    }

    remove(keyName, video) {
      return this.$q((resolve, reject) => {
        setTimeout(() => {
          if (video) {
            let currentArr = JSON.parse(localStorage.getItem(keyName)) || [];
            let index = currentArr.findIndex(vid => vid.id === video.id);
            currentArr.splice(index, 1);
            return localStorage.setItem(keyName, JSON.stringify(currentArr));
          }
          localStorage.removeItem(keyName);
          resolve(JSON.parse(localStorage.getItem(keyName)));
          reject(new Error('Error! Failed removing'));
        }, 500);
      });
    }

  }

  angular
    .module('videoApp')
    .service('StorageService', StorageService);

})();
