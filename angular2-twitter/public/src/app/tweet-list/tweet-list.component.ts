import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {

  constructor() { }

  @Input() tweets: any[];

  ngOnInit() { }

}