import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable()
export class GraphService {

  constructor() { }

  addSVG(id: string, dimensions): void {
    let svg = d3.select(id)
      .append('svg')
        .attr('width', dimensions.width + dimensions.margin.left + dimensions.margin.right)
        .attr('height', dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + dimensions.margin.left + ',' + dimensions.margin.top + ')');
  }

  addAxis(id: string, dimensions, axis, ticks, timeFormat): void {
    let svg = d3.select(id).select('svg').select('g');
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + dimensions.height + ')')
        .call(checkTicks(ticks, timeFormat));
    svg.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(axis.y));
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -50)
      .attr('x', -140)
      .style('text-anchor', 'end')
      .text('Amount of tweets');

    function checkTicks(ticks, timeFormat) {
      if (ticks && timeFormat) {
        return d3.axisBottom(axis.x)
          .ticks(ticks)
          .tickFormat(d3.timeFormat(timeFormat));
      }
      return d3.axisBottom(axis.x);
    }
  }
}