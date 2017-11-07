(function() {
  'use strict';

  class LinearGraphCtrl {
    constructor() {
      // set the dimensions of the canvas
      this.dimensions = {
        width: 800,
        height: 400,
        margin: {
          top: 20, 
          right: 30, 
          bottom: 30, 
          left: 80
        }
      }
    }
    $onChanges(changes) {
      if (changes.linearData) {
        this.linearData = angular.copy(this.linearData);
        if (this.linearData.length <= 0) {
          return;
        }
        this.drawLinearGraph(this.linearData);
      }
    }
    drawLinearGraph(linearData) {
      // remove old data
      d3.select('#linear').select('svg').remove();
      let parsedData = this.parseData(linearData);
      let axes = this.setAxes(parsedData);
      this.drawGraphArea(axes);
      this.addData(parsedData, axes);
    }
    parseData(linearData) {
      let parseTime = d3.timeParse('%H:%M');
      linearData.forEach((element) => {
        element.data.forEach((d) => {
          d.time = parseTime(d.time);
          d.freq = +d.freq;
        });
      });
      return linearData;
    }
    setAxes(linearData) {
      // set the ranges
      let axis = {
        x: d3.scaleTime()
        .rangeRound([0, this.dimensions.width]),
        y: d3.scaleLinear()
        .rangeRound([this.dimensions.height, 0])
      }
      let minX = d3.min(linearData, (element) => { 
        return d3.min(element.data, (d) => { return d.time; }); 
      });
      let maxX = d3.max(linearData, (element) => { 
        return d3.max(element.data, (d) => { return d.time; }); 
      });
      let maxY = d3.max(linearData, (element) => {
        return Math.max.apply(Math, element.data.map((o) => { return o.freq; }));
      });
      // scale the range of the data
      axis.x.domain([minX, maxX]);
      axis.y.domain([0, maxY]);
      return axis;
    }
    drawGraphArea(axis) {
      // add the SVG element
      let svg = d3.select('#linear')
        .append('svg')
          .attr('width', this.dimensions.width + this.dimensions.margin.left + this.dimensions.margin.right)
          .attr('height', this.dimensions.height + this.dimensions.margin.top + this.dimensions.margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + this.dimensions.margin.left + ',' + this.dimensions.margin.top + ')');
      // add axis
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this.dimensions.height + ')')
        .call(d3.axisBottom(axis.x)
          .ticks(1)
          .tickFormat(d3.timeFormat('%H:%M')));
      svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(axis.y));
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -140)
        .style('text-anchor', 'end')
        .text('Amount of tweets');
    }
    addData(linearData, axis) {
      // define the line
      let valueLine = d3.line()
        .x((d) => { return axis.x(d.time); })
        .y((d) => { return axis.y(d.freq); });
      // add line chart
      let selection = d3.select('#linear').select('svg').select('g').selectAll('.lines')
        .data(linearData)
        .enter()
        .append('g')
          .attr('class', 'linear');
      selection.append('path')
        .attr('class', 'line')
        .attr('d', (d) => { return valueLine(d.data); })
        .style('stroke', (d) => { return d.color; });
      // add label and point for line
      if (linearData.every(isNotEmpty)) {
        selection.append('text')
          .datum((d) => { return {word: d.word, data: d.data[d.data.length - 1]}; })
            .attr('class', 'word')
            .attr('transform', (d) => { return 'translate(' + axis.x(d.data.time) + ',' + axis.y(d.data.freq) + ')'; })
            .attr('x', 5)
            .attr('y', 6)
            .text((d) => { return d.word; });
        selection.append('circle')
          .datum((d) => { return {color: d.color, word: d.word, data: d.data[d.data.length - 1]}; })
            .attr('class', 'dot')
            .attr('cx', (d) => { return axis.x(d.data.time); })
            .attr('cy', (d) => { return axis.y(d.data.freq); })
            .attr('r', 4)
            .style('fill', (d) => { return d.color; });
      }
      // check if data for all element is avaliable
      function isNotEmpty(element) {
        return element.data.length > 0;
      }
    }
  }

  angular
    .module('twitterApp')
    .controller('LinearGraphCtrl', LinearGraphCtrl);
})();