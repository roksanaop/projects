import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent {

  @Input() tweets: any[];

  constructor() { }

}
