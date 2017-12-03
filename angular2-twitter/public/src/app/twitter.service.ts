import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { config } from './app.config';

@Injectable()
export class TwitterService {

  constructor(private http: Http) { }

  searchTweets(params) {
    return this.http.get(`${config.servHost}:${config.servPort}/${config.servSearch}/` + params.action + '/' + params.query);
  }
}