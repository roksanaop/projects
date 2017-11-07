(function() {
  'use strict';

  class SearchingService {
    constructor($resource, Oboe) {
      Object.assign(this, {$resource, Oboe});
      this.streams = [];
    }
    searchTweets(params) {
      let tweets = this.$resource('/tweets/:action/:query', params);
      return tweets.query({}, (res) => {
        return res;
      });
    }
    streamTweets(words, callback) {
      oboe('/tweets/filter/' + words.join())
        .node('$!.created_at', (tweet) => {
          this.streams.push(tweet);
          callback(this.streams);
        });
    }
  }

  angular
    .module('twitterApp')
    .service('SearchingService', SearchingService);
})();