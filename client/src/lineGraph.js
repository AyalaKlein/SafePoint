import React, { Component } from 'react';

import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { line } from 'd3-shape'
import { axisBottom, axisLeft, } from 'd3-axis'
import { timeFormat } from 'd3-time-format'
import { timeMonth } from 'd3-time'

export default class LineGraph extends Component {
    node = null

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.createLineGraph()
    }
    
    componentDidUpdate(){
        console.log("update")
        select(this.node).selectAll("svg").remove();
        this.createLineGraph();
    }

    createLineGraph() {
        const node = this.node
        let { data, size, xName, yName, labels, scaleMonth } = this.props
        var margin = { top: 20, right: 30, bottom: 30, left: 60 }
        const width = size[0];
        const height = size[1];

        data = data.sort((a, b) => a[xName] - b[xName])

        var svg = select(node)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.05)
            .domain(data.map(d => d[xName].toString()));

        svg.append("text")      // text label for the x axis
            .attr("x", (width + margin.left + margin.right) / 2)
            .attr("y", height + margin.bottom)
            .style("text-anchor", "middle")
            .text(labels[xName]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axisBottom(x));

        var y = scaleLinear()
            .domain([0, max(data, function (d) { return +d[yName]; })])
            .range([height, 0]);

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(labels[yName]);

        svg.append("g")
            .call(axisLeft(y));


        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", line()
                .x((d) => x(d[xName].toString()) + x.bandwidth()/2)
                .y((d) => y(d[yName]))
            )
    }

    render() {
        return <div ref={node => this.node = node}></div>
    }
}

LineGraph.defaultProps = {
    data: [
        { someName: 1, otherName: 5 },
        { someName: 30, otherName: 10 },
        { someName: 20, otherName: 1 },
        { someName: 5, otherName: 5 }],
    size: [500, 500],
    xName: 'someName',
    yName: 'otherName',
    labels: { someName: 'hello', otherName: 'world' }
}