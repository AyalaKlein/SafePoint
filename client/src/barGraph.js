import React, { Component } from 'react';

import { scaleLinear, scaleBand } from 'd3-scale'
import { max, extent } from 'd3-array'
import { select } from 'd3-selection'
import { line } from 'd3-shape'
import { axisBottom, axisLeft, } from 'd3-axis'
import { timeFormat } from 'd3-time-format'
import { timeMonth } from 'd3-time'
import * as moment from 'moment'

export default class BarGraph extends Component {
    node = null

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.createBarGraph()
    }

    componentDidUpdate(){
        console.log("update")
        select(this.node).selectAll("svg").remove();
        this.createBarGraph();
    }

    createBarGraph() {
        const node = this.node
        const { data, size, xName, yName, labels } = this.props
        var margin = { top: 20, right: 30, bottom: 30, left: 60 }
        const width = size[0];
        const height = size[1];

        var svg = select(node)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xScale = scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1)
            .domain([3,2,1,0].map(i=> moment().subtract(i, 'months').format('MMM YY') ));

        var yScale = scaleLinear()
            .rangeRound([height, 0])
            .domain([0, max(data, d => d[yName])]);

        svg.append("text")      // text label for the x axis
            .attr("x", (width + margin.left) / 2)
            .attr("y", height + margin.bottom)
            .style("text-anchor", "middle")
            .text(labels[xName]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axisBottom(xScale));

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(labels[yName]);

        svg.append("g")
            .call(axisLeft(yScale));


        svg.selectAll("div")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => xScale(moment(d[xName]).format('MMM YY')))
            .attr("y", d => yScale(d[yName]))
            .attr("height", d => height - yScale(d[yName]))
            .attr("width", d=> xScale.bandwidth())
    }

    render() {
        return <div ref={node => this.node = node}></div>
    }
}

BarGraph.defaultProps = {
    data: [
        { someName: new Date('2020-01-01'), otherName: 5 },
        { someName: new Date('2020-02-01'), otherName: 10 },
        { someName: new Date('2020-03-01'), otherName: 1 },
        { someName: new Date('2020-04-01'), otherName: 3 }],
    size: [500, 500],
    xName: 'someName',
    yName: 'otherName',
    labels: { someName: 'hello', otherName: 'world' }
}