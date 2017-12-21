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
  nextUpdate: number = 15;
  counter: number = 0;
  counterWord: string;
  activeColumn: string;
  isDesc: boolean = false;
  direction: number;
  headers: Headers[] = config.headers;

  constructor(private coincapService: CoincapService,
              private sortingService: SortingService) { }

  ngOnInit() {
    this.getData();
    this.updateTime();
    this.update();
  }

  ngOnDestroy() {
    this.getData()
      .unsubscribe();
    this.updateTime()
      .unsubscribe();
    this.update()
      .unsubscribe();
  }

  getData() {
    return this.coincapService.search()
      .subscribe(coincapResp => {
        let coincapArr = coincapResp.json();
        this.lastUpdate = new Date();
        this.counter++;
        this.counterWord = (this.counter === 1 ? 'raz' : 'razy');
        this.nextUpdate = 15;
        this.data = coincapArr;
      }, error => {
        alert('Serwis coincap.io może chwilowo nie działać lub spóźniać się z odpowiedzią.');
      });
  }

  update() {
    return Observable
      .interval(config.interval)
      .map(() => {
        return this.getData();
      })
      .subscribe();
  }

  updateTime() {
    return Observable
      .interval(1000)
      .map(() => {
        return this.nextUpdate--;
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
