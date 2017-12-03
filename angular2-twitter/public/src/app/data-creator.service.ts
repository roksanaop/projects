import { Injectable } from '@angular/core';

@Injectable()
export class DataCreatorService {

  constructor() { }

  createData(sortedData: Object, colors: string[]) {
    let i = 0;
    let data = {
      bar: [],
      map: [],
      linear: []
    }
    Object.entries(sortedData).forEach(([key, value]) => {
      data.bar = this.createBarData(data.bar, key, value, colors[i]);
      data.map = this.createMapData(data.map, key, value, colors[i]);
      data.linear = this.createLinearData(data.linear, key, value, colors[i]);
      i++;
    });
    return data;
  }

  createBarData(bar: Object[], key: string, value: any[], color: string): Object[] {
    //create JSON for Bar Graph {'word': 'text', 'freq': stream.length, 'color': 'color'}
    bar.push({word: key, freq: value.length, color: color});
    return bar;
  }

  createMapData(map: Object[], key: string, value: any[], color: string): Object[] {
    // create JSON for Map Graph {'word': 'text', 'coords': [lon, lat], 'color': 'color'}
    value.forEach((twit) => {
      let coordinates;
      if (twit.coordinates) {
        coordinates = twit.coordinates.coordinates;
      }
      if (twit.geo) {
        coordinates = twit.geo.coordinates;
      }
      if (twit.place) {
        coordinates = twit.place.bounding_box.coordinates[0][0];
      }
      if (coordinates) {
        map.push({word: key, coords: coordinates, color: color});
      }
    });
    return map;
  }

  createLinearData(linear: Object[], key: string, value: any[], color: string): Object[] {
    //create JSON for Linear Graph {'word': 'text', 'color': 'color', data: [{'time': 'time1', 'freq': stream.length}, {'time': 'time2', 'freq': stream.length}]}
    const MINUTES_IN_HOUR = 60;
    const INDEX_OF = {
      TWIT_START_HOUR: 11,
      TWIT_END_HOUR: 13,
      TWIT_START_MINUTES: 14,
      TWIT_END_MINUTES: 16,
      LOCAL_START_MINUTES: 3,
      LOCAL_END_MINUTES: 5
    };
    let time = 0;
    let freqData = [];
    let wordData = [];
    let offset = new Date().getTimezoneOffset();
    let timezone = Math.floor((Math.abs(offset/MINUTES_IN_HOUR)));
    value.forEach((twit) => {
      checkTwitTime(twit);
    });
    linear.push({word: key, data: wordData, color: color}); 
    return linear;

    function checkTwitTime(twit) {
      if (time === 0) {
        time = twit.created_at.substring(INDEX_OF.TWIT_START_HOUR, INDEX_OF.TWIT_END_MINUTES);
      }
      if (time.toString().substring(INDEX_OF.LOCAL_START_MINUTES, INDEX_OF.LOCAL_END_MINUTES) < twit.created_at.substring(INDEX_OF.TWIT_START_MINUTES, INDEX_OF.TWIT_END_MINUTES)) {
        let hourInZone = +twit.created_at.substring(INDEX_OF.TWIT_START_HOUR, INDEX_OF.TWIT_END_HOUR) + timezone;
        let timeInZone = hourInZone + twit.created_at.substring(INDEX_OF.TWIT_END_HOUR, INDEX_OF.TWIT_END_MINUTES);
        wordData.push({time: timeInZone, freq: freqData.length}); 
        freqData = [];
        time = twit.created_at.substring(INDEX_OF.TWIT_START_HOUR, INDEX_OF.TWIT_END_MINUTES);
      }
      freqData.push(twit.created_at.substring(INDEX_OF.TWIT_START_HOUR, INDEX_OF.TWIT_END_MINUTES));
    }
  }
}