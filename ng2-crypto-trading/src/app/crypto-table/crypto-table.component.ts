import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { CoincapService } from '../coincap.service';
import { SortingService } from '../sorting.service';
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
  activeColumn: string;
  isDesc: boolean = false;
  direction: number;
  headers: Headers[] = config.headers;

  constructor(private coincapService: CoincapService,
              private sortingService: SortingService) { }

  ngOnInit() {
    this.getData();
    this.update()
      .subscribe();
  }

  getData() {
    return this.coincapService.search()
      .subscribe(coincapResp => {
        let coincapArr = coincapResp.json();
        this.data = [];
        this.lastUpdate = new Date();
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
      });
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