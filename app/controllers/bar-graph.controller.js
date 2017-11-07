(function() {
  'use strict';

  class BarGraphCtrl {
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
      if (changes.barData) {
        this.barData = angular.copy(this.barData);
        if (this.barData.length <= 0) {
          return;
        }
        this.drawBarGraph(this.barData);
      }
    }
    drawBarGraph(barData) {
      // remove old data
      d3.select('#bar').select('svg').remove();
      let axes = this.setAxes(barData);
      this.drawGraphArea(axes);
      this.addData(barData, axes);
    }
    setAxes(barData) {
      // set the ranges
      let axis = {
        x: d3.scaleBand()
        .rangeRound([0, this.dimensions.width])
        .padding(0.5),
        y: d3.scaleLinear()
        .rangeRound([this.dimensions.height, 0])
      }
      // scale the range of the data
      axis.x.domain(barData.map((d) => { return d.word; }));
      axis.y.domain([0, d3.max(barData, (d) => { return d.freq; })]);
      if (d3.min(barData, (d) => { return d.freq; }) >= 100) {
        axis.y.domain([100, d3.max(barData, (d) => { return d.freq; })]);
      }
      return axis;
    }
    drawGraphArea(axis) {
      // add the SVG element
      let svg = d3.select('#bar')
        .append('svg')
          .attr('width', this.dimensions.width + this.dimensions.margin.left + this.dimensions.margin.right)
          .attr('height', this.dimensions.height + this.dimensions.margin.top + this.dimensions.margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + this.dimensions.margin.left + ',' + this.dimensions.margin.top + ')');
      // add axis
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + this.dimensions.height + ')')
        .call(d3.axisBottom(axis.x));
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
    addData(barData, axis) {
      // add bar chart
      var selection = d3.select('#bar').select('svg').select('g').selectAll('bar')
        .data(barData);
      selection.exit().remove();
      selection.enter()
        .append('rect')
          .style('fill', (d) => { return d.color; })
          .attr('class', 'bar')
          .attr('x', (d) => { return axis.x(d.word); })
          .attr('width', axis.x.bandwidth())
          .attr('y', (d) => { return axis.y(d.freq); })
          .attr('height', (d) => { return this.dimensions.height - axis.y(d.freq); });
    }
  }

  angular
    .module('twitterApp')
    .controller('BarGraphCtrl', BarGraphCtrl);
})();