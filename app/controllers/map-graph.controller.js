(function() {
  'use strict';

  class MapGraphCtrl {
    constructor() {
      this.dimension = {
        width: 1000,
        height: 500
      }
      this.projection = d3.geoMercator().scale(130).translate([this.dimension.width/2.5, this.dimension.height/1.5]); // set the Mercator projection
      this.drawMap();
    }
    $onChanges(changes) {
      if (changes.mapData) {
        this.mapData = angular.copy(this.mapData);
        this.addData(this.mapData, this.barData);
      }
    }
    drawMap() {
      // add the SVG element
      let svg = d3.select('#map')
        .append('svg')
          .attr('width', this.dimension.width)
          .attr('height', this.dimension.height)
        .append('g');
      let path = d3.geoPath().projection(this.projection);
      // draw the map
      d3.json('https://gist.githubusercontent.com/manishmshiva/92aaeccbc8cc7146d2d5d6deefb3095a/raw/23c771129805836c1cecdc7837e6d0b28cc341fc/world.json', (geo_data) => {
        svg.selectAll('path')
          .data(geo_data.features)
          .enter()
          .append('path')
            .attr('class', 'borderMap')
            .attr('d', path)
      });
    }
    addData(mapData, legendData) {
      // remove old data
      d3.select('#map').select('svg').select('g').selectAll('.bubble').remove();
      d3.select('#map').select('svg').select('g').selectAll('.legend').remove();
      this.addGraph(mapData);
      this.addLegend(legendData);
    }
    addGraph(mapData) {
      // add data and transform coordinates
      mapData = mapData.map((d) => {
        return {word: d.word, coords: this.projection([+d.coords[0], +d.coords[1]]), color: d.color};
      });
      // add circles from data
      let bubble = d3.select('#map').select('svg').select('g')
        .selectAll('.bubble')
        .data(mapData)
        .enter()
        .append('g')
          .attr('class', 'bubble')
      bubble.append('circle')
        .attr('cx', (d) => { return d.coords[0]; })
        .attr('cy', (d) => { return d.coords[1]; })
        .attr('r', 4)
        .style('fill', (d) => { return d.color; });
    }
    addLegend(legendData) {
      // set starter legend position and offset for legend elements
      let startPosition = 325;
      let offset = 30;
      // add the area for legend
      let legend = d3.select('#map').select('svg').select('g')
        .selectAll('.legend')
        .data(legendData)
        .enter()
        .append('g')
          .attr('class', 'legend')
          .attr('transform', (d) => {
            let newPosition = startPosition;
            startPosition += offset;
            return 'translate(0, ' + newPosition + ')';
          });
      // add the shape for each group - circle
      legend.append('circle')
        .attr('cx', '10px')
        .attr('cy', '10px')
        .attr('r', 4)
        .style('fill', (d) => { return d.color; })
        .style('stroke', '#000');
      // add the text for legend
      legend.append('text')
        .attr('x', 25)
        .attr('y', 15)
        .text((d) => { return d.word; });
    }
  }

  angular
    .module('twitterApp')
    .controller('MapGraphCtrl', MapGraphCtrl);
})();