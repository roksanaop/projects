import { Injectable } from '@angular/core';

@Injectable()
export class SortingService {

  constructor() { }

  addSortingClass(activeColumn, column, isDesc) {
    if (activeColumn === column && isDesc) {
      return 'fa-sort-asc';
    }
    if (activeColumn === column && !isDesc) {
      return 'fa-sort-desc';
    }
    return 'fa-sort';
  }
}