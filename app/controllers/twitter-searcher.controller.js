(function() {
  'use strict';

  class TwitterSearcherCtrl {
    constructor($scope, DataCreatorService, SearchingService, TwitterService) {
      Object.assign(this, {$scope, DataCreatorService, SearchingService, TwitterService});
      this.tweets = [];
      this.words = [{}];
      this.data = {
        barData: [],
        mapData: [],
        linearData: []
      }
      this.init({
        colors: ['#FFFF4D', '#4D4DFF', '#FF4D4D', '#4DFF4D'] // colors for different words
      });
    }

    add(word, inputNumber) {
      if (this.words.length === 1) {
        this.words[0].id = this.words.length;
      }
      const MAX_INPUT = 4;
      if (this.words.length < MAX_INPUT) {
        this.words.push({
          id: this.words.length + 1
        });
      }
      let currentWords = [];
      this.words.forEach((element) => {
        currentWords.push(element.word);
      });
      // start stream with oboe in service
      this.SearchingService.streamTweets(currentWords, (streamArray) => { this.groupStreamByWord(streamArray, currentWords); });
      let params = {
        action: 'search',
        query: word
      }
      // start search tweets
      this.TwitterService.searchTweets(params)
        .then((tweetArray) => {
          if(this.tweets[inputNumber - 1]) {
            return this.tweets.splice(inputNumber - 1, 1, tweetArray);
          }
          this.tweets.push(tweetArray);
        });
    }

    groupStreamByWord(stream, words) {
      let sortedStream = {};
      words.forEach((word) => {
        if (word === void 0 || word === "") {
          return;
        }
        sortedStream[word] = [];
        sortedStream[word] = groupData(stream, sortedStream[word], word);
        let allData = this.DataCreatorService.createData(sortedStream, this.config.colors);
        this.data.barData = allData.bar
        this.data.mapData = allData.map;
        this.data.linearData = allData.linear;
      });
      this.$scope.$apply();

      function groupData(stream, sortedWord, word) {
        // group data from stream on different variables
        stream.forEach((data) => {
          if (data.text === void 0) {
            return;
          }
          if ((data.text.toLowerCase()).indexOf(word.toLowerCase()) !== -1) {
            sortedWord.push(data);
          }
        });
        return sortedWord;
      }
    }

    init(config) {
      Object.assign(this, {config});
    }
  }

  angular
    .module('twitterApp')
    .controller('TwitterSearcherCtrl', TwitterSearcherCtrl)
})();
