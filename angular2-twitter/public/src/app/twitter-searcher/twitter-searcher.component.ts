import { Component, OnInit } from '@angular/core';

import { DataCreatorService } from '../data-creator.service';
import { SearchingService } from '../searching.service';
import { TwitterService } from '../twitter.service';
import { config } from '../app.config';

import { GraphData } from '../app.classes';

@Component({
  selector: 'app-twitter-searcher',
  templateUrl: './twitter-searcher.component.html',
  styleUrls: ['./twitter-searcher.component.css']
})

export class TwitterSearcherComponent implements OnInit {
  tweets: any[];
  words: any[];
  data: GraphData;

  constructor(private twitterService: TwitterService,
              private searchingService: SearchingService,
              private dataCreatorService: DataCreatorService) {  }

  ngOnInit() {
    this.words = [{}];
    this.tweets = [];
    this.data = {barData: [], mapData: [], linearData: []};
  }

  add(word: string, inputNumber: number): void {
    if (this.words.length === 1) {
      this.words[0].id = this.words.length;
    }
    const MAX_INPUT = config.maxInputs;
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
    this.searchingService.streamTweets(currentWords, (streamArray) => { this.groupStreamByWord(streamArray, currentWords); });
    let params = {
      action: 'search',
      query: word
    }
    // start search tweets
    this.twitterService.searchTweets(params)
      .subscribe((tweetArray) => {
        let tweetArr = tweetArray.json();
        if(this.tweets[inputNumber - 1]) {
          return this.tweets.splice(inputNumber - 1, 1, tweetArr);
        }
        this.tweets.push(tweetArr);
      });
  }

  groupStreamByWord(stream, words: any[]): void {
    let sortedStream = {};
    let colors = config.colors;
    words.forEach((word) => {
      if (word === void 0 || word === "") {
        return;
      }
      sortedStream[word] = [];
      sortedStream[word] = groupData(stream, sortedStream[word], word);
      let allData = this.dataCreatorService.createData(sortedStream, colors);
      this.data.barData = allData.bar
      this.data.mapData = allData.map;
      this.data.linearData = allData.linear;
    });

    function groupData(stream: any[], sortedWord: string[], word: string): any[] {
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