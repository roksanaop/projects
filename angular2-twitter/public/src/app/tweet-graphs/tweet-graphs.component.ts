import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { GraphData } from '../app.classes';

@Component({
  selector: 'app-tweet-graphs',
  templateUrl: './tweet-graphs.component.html',
  styleUrls: ['./tweet-graphs.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class TweetGraphsComponent implements OnInit {

  constructor() { }

  @Input() data: GraphData;

  ngOnInit() {  }

}