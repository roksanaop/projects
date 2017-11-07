(function() {
  'use strict';

  class DataCreatorService {
    createData(sortedData, colors) {
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
    createBarData(bar, key, value, color) {
      //create JSON for Bar Graph {'word': 'text', 'freq': stream.length, 'color': 'color'}
      bar.push({word: key, freq: value.length, color: color});
      return bar;
    }
    createMapData(map, key, value, color) {
      // create JSON for Map Graph {'word': 'text', 'coords': [lon, lat], 'color': 'color'}
      value.forEach((twit) => {
        if (twit.coordinates) {
          return map.push({word: key, coords: twit.coordinates.coordinates, color: color});
        }
        if (twit.geo) {
          return map.push({word: key, coords: twit.geo.coordinates, color: color});
        }
        if (twit.place) {
          return map.push({word: key, coords: twit.place.bounding_box.coordinates[0][0], color: color});
        }
      });
      return map;
    }
    createLinearData(linear, key, value, color) {
      //create JSON for Linear Graph {'word': 'text', 'color': 'color', data: [{'time': 'time1', 'freq': stream.length}, {'time': 'time2', 'freq': stream.length}]}
      let time = 0;
      let freqData = [];
      let wordData = [];
      let offset = new Date().getTimezoneOffset();
      let timezone = Math.floor((Math.abs(offset/60)));
      value.forEach((twit) => {
        if (time === 0) {
          time = twit.created_at.substring(11, 16);
        }
        if (time.substring(3, 5) < twit.created_at.substring(14, 16)) {
          let hourInZone = +twit.created_at.substring(11, 13) + timezone;
          let timeInZone = hourInZone + twit.created_at.substring(13, 16);
          wordData.push({time: timeInZone, freq: freqData.length}); 
          freqData = [];
          time = twit.created_at.substring(11, 16);
        }
        freqData.push(twit.created_at.substring(11, 16));
      });
      linear.push({word: key, data: wordData, color: color}); 
      return linear;
    }
  }

  angular
    .module('twitterApp')
    .service('DataCreatorService', DataCreatorService);
})();