import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { DataCreatorService } from './data-creator.service';
import { GraphService } from './graph.service';
import { LinearGraphComponent } from './linear-graph/linear-graph.component';
import { MapGraphComponent } from './map-graph/map-graph.component';
import { SearchingService } from './searching.service';
import { TweetGraphsComponent } from './tweet-graphs/tweet-graphs.component';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { TwitterSearcherComponent } from './twitter-searcher/twitter-searcher.component';
import { TwitterService } from './twitter.service';

@NgModule({
  declarations: [
    AppComponent,
    TwitterSearcherComponent,
    TweetListComponent,
    TweetGraphsComponent,
    BarGraphComponent,
    MapGraphComponent,
    LinearGraphComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [ SearchingService, TwitterService, GraphService, DataCreatorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }