(function() {
  'use strict';

  class TwitterSearcherCtrl {
    constructor($q, $resource, BarGraphService, MapGraphService, LinearGraphService, Oboe) {
      Object.assign(this, {$q, $resource, BarGraphService, MapGraphService, LinearGraphService, Oboe});
      this.tweeters = [];
      this.streams = [];
      this.words = [
      { id: 1,
        word: ''
      }];
    }

    add(word, inputNumber) {

      this.streams = [];
      if (this.words.length < 4) {
        this.words.push({
          id: this.words.length + 1,
          word: ''
        });
      }

      var currentWords = [];
      this.words.forEach((element) => {
        currentWords.push(element.word);
      });

      var params = {
        action: 'search',
        query: word
      }

      this.tweets = this.$resource('/tweets/:action/:query', params);

      this.tweets.query({}, (res) => {
        if(this.tweeters[inputNumber - 1]) {
          return this.tweeters.splice(inputNumber - 1, 1, res);
        }
        this.tweeters.push(res);
      });

      oboe('/tweets/filter/' + currentWords.join())
        .node('$!.created_at', (tweet) => {
          this.streams.push(tweet);
          this.groupStreamByWord(this.streams, currentWords);
        });
    }

    groupStreamByWord(stream, words) {

      var sortedStream = {};

      words.forEach((word) => {

        if (word === void 0 || word === "") {
          return;
        }

        sortedStream[word] = [];
        // group data from stream on different variables
        stream.forEach((data) => {
          if (data.text === void 0) {
            return;
          }
          if ((data.text.toLowerCase()).indexOf(word.toLowerCase()) !== -1) {
            sortedStream[word].push(data);
          }
        });

        var colors = ['#FFFF4D', '#4D4DFF', '#FF4D4D', '#4DFF4D']; // colors for different words
        var i = 0;
            
        var dataForBar = [];
        var dataForMap = [];
        var dataForLinear = [];
        
        Object.entries(sortedStream).forEach(([key, value]) => {
          //create JSON for Bar Graph {'word': 'text', 'freq': stream.length, 'color': 'color'}
          dataForBar.push({word: key, freq: value.length, color: colors[i]}); 

          var time = 0;
          var freqData = [];
          var wordData = [];
          var offset = new Date().getTimezoneOffset();
          var timezone = Math.floor((Math.abs(offset/60)));

          value.forEach((twit) => {
            //create JSON for Linear Graph {'word': 'text', 'color': 'color', data: [{'time': 'time1', 'freq': stream.length}, {'time': 'time2', 'freq': stream.length}]}
            if (time === 0) {
              time = twit.created_at.substring(11, 16);
            }
            if (time.substring(3, 5) < twit.created_at.substring(14, 16)) {
              var hourInZone = +twit.created_at.substring(11, 13) + timezone;
              var timeInZone = hourInZone + twit.created_at.substring(13, 16);
              wordData.push({time: timeInZone, freq: freqData.length}); 
              freqData = [];
              time = twit.created_at.substring(11, 16);
            }
            freqData.push(twit.created_at.substring(11, 16));
          
            // create JSON for Map Graph {'word': 'text', 'coords': [lon, lat], 'color': 'color'}
            if (twit.coordinates) {
              return dataForMap.push({word: key, coords: twit.coordinates.coordinates, color: colors[i]}); 
            }
            if (twit.geo) {
              return dataForMap.push({word: key, coords: twit.geo.coordinates, color: colors[i]}); 
            }
            if (twit.place) {
              return dataForMap.push({word: key, coords: twit.place.bounding_box.coordinates[0][0], color: colors[i]}); 
            }
          });

          dataForLinear.push({word: key, data: wordData, color: colors[i]}); 
          i++;
        });

        this.BarGraphService.drawBar(dataForBar);
        this.MapGraphService.addData(dataForMap, dataForBar);
        this.LinearGraphService.drawLinear(dataForLinear);
      });
    }
  }

  angular
    .module('twitterApp')
    .controller('TwitterSearcherCtrl', TwitterSearcherCtrl)

})();