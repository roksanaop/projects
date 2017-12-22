import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { CoincapService } from '../services/coincap.service';
import { SortingService } from '../services/sorting.service';
import { config } from '../app.config';

import { CryptoData, Headers } from '../app.classes';

@Component({
  selector: 'app-crypto-table',
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.css']
})
export class CryptoTableComponent implements OnInit {

  data: CryptoData[] = [];
  lastUpdate: Date;
  nextUpdate: number = config.interval;
  counter: number = 0;
  counterWord: string;
  activeColumn: string;
  isDesc: boolean = false;
  direction: number;
  headers: Headers[] = config.headers;

  constructor(private coincapService: CoincapService,
              private sortingService: SortingService) { }

  ngOnInit() {
    this.lastUpdate = new Date();
    this.getData();
    this.updateTime();
  }

  ngOnDestroy() {
    this.getData()
      .unsubscribe();
    this.updateTime()
      .unsubscribe();
  }

  getData() {
    return this.coincapService.search()
      .subscribe(coincapResp => {
        let coincapArr = coincapResp.json();
        this.counter++;
        this.counterWord = (this.counter === 1 ? 'raz' : 'razy');
        this.data = coincapArr;
      }, error => {
        alert('Serwis coincap.io może chwilowo nie działać lub spóźniać się z odpowiedzią.');
      });
  }

  updateTime() {
    return Observable
      .interval(1000)
      .map(() => {
        if (this.nextUpdate > 0) {
          return this.nextUpdate--;
        }
        this.nextUpdate = config.interval;
        this.lastUpdate = new Date();
        return this.getData();
      })
      .subscribe();
  }

  sort(column) {
    this.isDesc = !this.isDesc;
    this.activeColumn = column;
    this.direction = this.isDesc ? 1 : -1;
  }

  whichChangeClass(change) {
    if (change > 0) {
      return config.class.positive;
    }
    if (change < 0) {
      return config.class.negative;
    }
    return config.class.neutral;
  }

  whichFaClass(column) {
    return this.sortingService.addSortingClass(this.activeColumn, column, this.isDesc);
  }
}
