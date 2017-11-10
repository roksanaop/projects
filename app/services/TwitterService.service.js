(function() {
  'use strict';

  class TwitterService {
    constructor($http) {
      Object.assign(this, {$http});
    }

    searchTweets(params) {
      return this.$http.get('/tweets/' + params.action + '/' + params.query)
        .then((res) => {
          return res.data;
        })
        .catch(() => alert('Try again with another word'));
    }
  }

  angular
    .module('twitterApp')
    .service('TwitterService', TwitterService);
})();