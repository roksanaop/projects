(function() {
  'use strict';

  class LinearGraphService {

    drawLinear(linearData) {

      d3.select('#linear').select('svg').remove();

      // set the dimensions of the canvas
      var width = 800,
        height = 400;
      var margin = {
        top: 20, 
        right: 50, 
        bottom: 30, 
        left: 80
      };
      // set the ranges
      var x = d3.scaleTime()
        .rangeRound([0, width]);
      var y = d3.scaleLinear()
        .rangeRound([height, 0]);

      var parseTime = d3.timeParse('%H:%M');
      // add the SVG element
      var svg = d3.select('#linear')
        .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      linearData.forEach((element) => {
        element.data.forEach((d) => {
          d.time = parseTime(d.time);
          d.freq = +d.freq;
        });
      });

      var minX = d3.min(linearData, (element) => { 
        return d3.min(element.data, (d) => { return d.time; }); 
      });
      var maxX = d3.max(linearData, (element) => { 
        return d3.max(element.data, (d) => { return d.time; }); 
      });
      var maxY = d3.max(linearData, (element) => {
        return Math.max.apply(Math, element.data.map((o) => { return o.freq; }));
      });

      // scale the range of the data
      x.domain([minX, maxX]);
      y.domain([0, maxY]);

      // define the line
      var valueLine = d3.line()
        .x((d) => { return x(d.time); })
        .y((d) => { return y(d.freq); });

      // add axis
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x)
          .ticks(1)
          .tickFormat(d3.timeFormat('%H:%M')));
      svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(y));
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -140)
        .style('text-anchor', 'end')
        .text('Amount of tweets');

      // add line chart
      var selection = svg.selectAll('.lines')
        .data(linearData)
        .enter()
        .append('g')
          .attr('class', 'linear');
        
      selection.append('path')
        .attr('class', 'line')
        .attr('d', (d) => { return valueLine(d.data); })
        .style('stroke', (d) => { return d.color; });

      // add label and point for line
      if (linearData[0].data.length > 0) {
        selection.append('text')
          .datum((d) => { return {word: d.word, data: d.data[d.data.length - 1]}; })
            .attr('class', 'word')
            .attr('transform', (d) => { return 'translate(' + x(d.data.time) + ',' + y(d.data.freq) + ')'; })
            .attr('x', 5)
            .attr('y', 6)
            .text((d) => { return d.word; });

        selection.append('circle')
          .datum((d) => { return {color: d.color, word: d.word, data: d.data[d.data.length - 1]}; })
            .attr('class', 'dot')
            .attr('cx', (d) => { return x(d.data.time); })
            .attr('cy', (d) => { return y(d.data.freq); })
            .attr('r', 4)
            .style('fill', (d) => { return d.color; });
      }
    }
  }

  angular
    .module('twitterApp')
    .service('LinearGraphService', LinearGraphService);
})();