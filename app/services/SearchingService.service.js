(function() {
  'use strict';

  class SearchingService {
    constructor(Oboe) {
      Object.assign(this, {Oboe});
    }

    streamTweets(words, callback) {
      let streams = [];
      oboe('/tweets/filter/' + words.join())
        .node('$!.created_at', (tweet) => {
          streams.push(tweet);
          callback(streams);
        });
    }
  }

  angular
    .module('twitterApp')
    .service('SearchingService', SearchingService);
})();
