(function() {
  'use strict';

  class TwitterSearcherCtrl {
    constructor($scope, DataCreatorService, SearchingService) {
      Object.assign(this, {$scope, DataCreatorService, SearchingService});
      this.tweets = [];
      this.words = [{
        id: 1
      }];
      this.colors = ['#FFFF4D', '#4D4DFF', '#FF4D4D', '#4DFF4D']; // colors for different words
      this.barData = [];
      this.mapData = [];
      this.linearData = [];
    }
    add(word, inputNumber) {
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
      let tweetArray = this.SearchingService.searchTweets(params);
      if (tweetArray) {
        if(this.tweets[inputNumber - 1]) {
          return this.tweets.splice(inputNumber - 1, 1, tweetArray);
        }
        this.tweets.push(tweetArray);
      }
    }
    groupStreamByWord(stream, words) {
      let sortedStream = {};
      this.$scope.$apply();
      words.forEach((word) => {
        if (word === void 0 || word === "") {
          return;
        }
        sortedStream[word] = [];
        sortedStream[word] = groupData(stream, sortedStream[word], word);
        let allData = this.DataCreatorService.createData(sortedStream, this.colors);
        this.barData = allData.bar
        this.mapData = allData.map;
        this.linearData = allData.linear;
      });
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
  }

  angular
    .module('twitterApp')
    .controller('TwitterSearcherCtrl', TwitterSearcherCtrl)
})();
