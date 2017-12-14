import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';

import { BarData, Dimensions, MapData } from '../app.classes';

@Component({
  selector: 'app-map-graph',
  templateUrl: './map-graph.component.html',
  styleUrls: ['./map-graph.component.css']
})
export class MapGraphComponent implements OnInit {

  dimension: Dimensions = {
    width: 1000,
    height: 500
  };
  // set the Mercator projection
  projection: any = d3.geoMercator().scale(130).translate([this.dimension.width/2.5, this.dimension.height/1.5]);

  @Input() mapData: MapData[];
  @Input() barData: BarData[];

  constructor() {   }

  ngOnInit() {  
    this.drawMap();
  }

  ngOnChanges(changes) {
    if (changes.mapData) {
      this.addData(this.mapData, this.barData);
    }
  }

  drawMap() {
    // add the SVG element
    const svg = d3.select('#map')
      .append('svg')
        .attr('width', this.dimension.width)
        .attr('height', this.dimension.height)
      .append('g');
    const path = d3.geoPath().projection(this.projection);
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

  addData(mapData: MapData[], legendData): void {
    // remove old data
    d3.select('#map').select('svg').select('g').selectAll('.bubble').remove();
    d3.select('#map').select('svg').select('g').selectAll('.legend').remove();
    let parsedData = this.parseData(mapData);
    // console.log(parsedData);
    this.addGraph(parsedData);
    this.addLegend(legendData);
  }

  parseData(mapData: MapData[]): MapData[] {
    // add data and transform coordinates
    return mapData.map((d) => {
      return {word: d.word, coords: this.projection([+d.coords[0], +d.coords[1]]), color: d.color};
    });
  }

  addGraph(parseData: MapData[]): void {
    // add circles from data
    let bubble = d3.select('#map').select('svg').select('g')
      .selectAll('.bubble')
      .data(parseData)
      .enter()
      .append('g')
        .attr('class', 'bubble')
    bubble.append('circle')
      .attr('cx', d => d['coords'][0] )
      .attr('cy', d => d['coords'][1] )
      .attr('r', 4)
      .style('fill', d => d['color'] );
  }

  addLegend(legendData: BarData[]): void {
    // set starter legend position and offset for legend elements
    const OFFSET = 30;
    let startPosition = 325;
    // add the area for legend
    let legend = d3.select('#map').select('svg').select('g')
      .selectAll('.legend')
      .data(legendData)
      .enter()
      .append('g')
        .attr('class', 'legend')
        .attr('transform', d => {
          let newPosition = startPosition;
          startPosition += OFFSET;
          return 'translate(0, ' + newPosition + ')';
        });
    // add the shape for each group - circle
    legend.append('circle')
      .attr('cx', '10px')
      .attr('cy', '10px')
      .attr('r', 4)
      .style('fill', d => d['color'] )
      .style('stroke', '#000');
    // add the text for legend
    legend.append('text')
      .attr('x', 25)
      .attr('y', 15)
      .text(d => d['word'] );
  }
}
