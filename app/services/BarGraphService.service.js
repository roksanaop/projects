(function() {
  'use strict';

  class BarGraphService {

    drawBar(barData) {

      d3.select('#bar').select('svg').remove();

      // set the dimensions of the canvas
      var width = 800,
        height = 400;
      var margin = {
        top: 20, 
        right: 30, 
        bottom: 30, 
        left: 80
      };
      // set the ranges
      var x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.5);
      var y = d3.scaleLinear()
        .rangeRound([height, 0]);

      // add the SVG element
      var svg = d3.select('#bar')
        .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // scale the range of the data
      x.domain(barData.map((d) => { return d.word; }));
      y.domain([0, d3.max(barData, (d) => { return d.freq; })]);
      if (d3.min(barData, (d) => { return d.freq; }) >= 100) {
        y.domain([100, d3.max(barData, (d) => { return d.freq; })]);
      }
      // add axis
      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));
      svg.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(y));
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -140)
        .style('text-anchor', 'end')
        .text('Amount of tweets');

      // add bar chart
      var selection = svg.selectAll('bar')
        .data(barData);
        
      selection.exit().remove();

      selection.enter()
        .append('rect')
          .style('fill', (d) => { return d.color; })
          .attr('class', 'bar')
          .attr('x', (d) => { return x(d.word); })
          .attr('width', x.bandwidth())
          .attr('y', (d) => { return y(d.freq); })
          .attr('height', (d) => { return height - y(d.freq); });
    }
    
  }

  angular
    .module('twitterApp')
    .service('BarGraphService', BarGraphService);
})();