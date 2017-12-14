import { Injectable } from '@angular/core';

import { CreatedData } from './app.classes';

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
    data = Object
      .entries(sortedData)
      .reduce((acc, [key, value]) => {
        acc.bar = acc.bar.concat(this.createBarData({ key, value, color: colors[acc.i] }));
        acc.map = acc.map.concat(this.createMapData({ key, value, color: colors[acc.i] }));
        acc.linear = acc.linear.concat(this.createLinearData({ key, value, color: colors[acc.i] }));
        acc.i++;
        return acc;
      }, { bar: [], map: [], linear: [], i: 0 });
    return data;
  }

  createBarData(createData: CreatedData): Object[] {
    //create JSON for Bar Graph {'word': 'text', 'freq': stream.length, 'color': 'color'}
    let bar = [];
    bar.push({word: createData.key, freq: createData.value.length, color: createData.color});
    return bar;
  }

  createMapData(createData: CreatedData): Object[] {
    // create JSON for Map Graph {'word': 'text', 'coords': [lon, lat], 'color': 'color'}
    let map = [];
    createData.value.forEach((twit) => {
      const coordinates = (twit.place && twit.place.bounding_box.coordinates[0][0]) || (twit.geo && twit.geo.coordinates) || (twit.coordinates && twit.coordinates.coordinates);
      if (coordinates) {
        map.push({word: createData.key, coords: coordinates, color: createData.color});
      }
    });
    return map;
  }

  createLinearData(createData: CreatedData): Object[] {
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
    let linear = [];
    createData.value.forEach((twit) => {
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
    });
    linear.push({word: createData.key, data: wordData, color: createData.color}); 
    return linear;
  }
}
