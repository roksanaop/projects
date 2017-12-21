import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CoincapService {

  constructor(private http: Http) { }

  search() {
    return this.http.get('http://coincap.io/front');
  }
}
