import { Injectable } from '@angular/core';
import * as oboe from 'oboe';
import { config } from './app.config';

@Injectable()
export class SearchingService {

  constructor() {  }

  streamTweets(words: string[], callback): void {
    let streams = [];
    oboe(`${config.servHost}:${config.servPort}/${config.servStream}/` + words.join())
      .node('$!.created_at', (tweet) => {
        streams.push(tweet);
        callback(streams);
      });
  }
}