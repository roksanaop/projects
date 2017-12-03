import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';

import { GraphService } from '../graph.service';
import { Dimensions, BarData } from '../app.classes';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit {

  dimensions: Dimensions;

  constructor(private graphService: GraphService) { 
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

  @Input() barData: BarData[];

  ngOnInit() {  }

  ngOnChanges(changes) {
    if (changes.barData) {
      this.barData = this.barData;
      if (this.barData.length <= 0) {
        return;
      }
      this.drawBarGraph(this.barData);
    }
  }

  drawBarGraph(barData: BarData[]): void {
    // remove old data
    d3.select('#bar').select('svg').remove();
    let axes = this.setAxes(barData);
    this.graphService.addSVG('#bar', this.dimensions);
    this.graphService.addAxis('#bar', this.dimensions, axes, undefined, undefined);
    this.addData(barData, axes);
  }

  setAxes(barData: BarData[]) {
    // set the ranges
    let axis = {
      x: d3.scaleBand()
      .rangeRound([0, this.dimensions.width])
      .padding(0.5),
      y: d3.scaleLinear()
      .rangeRound([this.dimensions.height, 0])
    }
    // scale the range of the data
    let minY = d3.min(barData, (d) => { return d['freq']; });
    let maxY = d3.max(barData, (d) => { return d['freq']; });
    axis.x.domain(barData.map((d) => { return d.word; }));
    axis.y.domain([0, maxY]);
    if (minY >= 100) {
      axis.y.domain([100, maxY]);
    }
    return axis;
  }
  
  addData(barData: BarData[], axis): void {
    // add bar chart
    var selection = d3.select('#bar').select('svg').select('g').selectAll('bar')
      .data(barData);
    selection.exit().remove();
    selection.enter()
      .append('rect')
        .style('fill', (d) => { return d['color']; })
        .attr('class', 'bar')
        .attr('x', (d) => { return axis.x(d['word']); })
        .attr('width', axis.x.bandwidth())
        .attr('y', (d) => { return axis.y(d['freq']); })
        .attr('height', (d) => { return this.dimensions.height - axis.y(d['freq']); });
  }
}