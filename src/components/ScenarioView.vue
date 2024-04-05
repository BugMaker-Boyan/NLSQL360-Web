<script setup>
import { ref, defineProps, onMounted } from 'vue'
import * as d3 from 'd3'

const initHeatMap = (data, options) => {
    const margin = options.margin
    const width = options.width - margin.left - margin.right
    const height = options.height - margin.top - margin.bottom
    const elemId = options.elemId
    const svg = d3.select(`#${elemId}`).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    const rowLabels = d3.map(data, function (d) { return d.rowLabel; })
    const colLabels = d3.map(data, function (d) { return d.colLabel; })

    const x = d3.scaleBand()
        .range([0, width])
        .domain(rowLabels)
        .padding(0.05);

    svg.append("g")
        .style("font-size", 12)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

    const y = d3.scaleBand()
        .range([height, 0])
        .domain(colLabels)
        .padding(0.05);

    svg.append("g")
        .style("font-size", 12)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()

    const color = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([0, 100])

    const tooltip = d3.select(`#${elemId}`)
        .append("div")
        .style("float", "left")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    const mouseover = function (event, d) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }
    const mousemove = function (event, d) {
        console.log(d3.pointer(event))
        tooltip
            .html("The exact value: " + d.value)
            .style("left", (d3.pointer(event)[0] + 80) + "px")
            .style("top", (d3.pointer(event)[1] - 300) + "px")
    }
    const mouseleave = function (event, d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    svg.selectAll()
        .data(data, function (d) { return d.rowLabel + ':' + d.colLabel; })
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.rowLabel) })
        .attr("y", function (d) { return y(d.colLabel) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) { return color(d.value) })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    return Object.assign(svg.node(), { scales: { color } });
}

const initBoxPlot = (data, options) => {
    const margin = options.margin
    const width = options.width - margin.left - margin.right
    const height = options.height - margin.top - margin.bottom
    const elemId = options.elemId
    const svg = d3.select(`#${elemId}`)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    
}

const leftContainer = ref(null)
const rightContainer = ref(null)

onMounted(() => {
    const options = {
        margin: { top: 20, right: 100, bottom: 20, left: 50 },
        width: leftContainer.value.clientWidth,
        height: leftContainer.value.clientHeight,
        elemId: "leftContainer"
    }
    const data = [
        {
            rowLabel: "DINSQL",
            colLabel: "AGG-1",
            value: 85
        },
        {
            rowLabel: "DAILSQL",
            colLabel: "AGG-1",
            value: 80
        },
        {
            rowLabel: "C3SQL",
            colLabel: "AGG-1",
            value: 70
        },
        {
            rowLabel: "DINSQL",
            colLabel: "AGG-2",
            value: 90
        },
        {
            rowLabel: "DAILSQL",
            "colLabel": "AGG-2",
            "value": 75
        },
        {
            rowLabel: "C3SQL",
            "colLabel": "AGG-2",
            "value": 80
        }
    ]

    const heatmap = initHeatMap(data, options)

    // while (leftContainer.value.firstChild) {
    //     leftContainer.value.removeChild(leftContainer.value.firstChild);
    // }

    // leftContainer.value.appendChild(heatmap)

})
</script>

<template>
    <div class="frameworkTitle">
        <div class="title">Scenario View</div>
        <p class="titleTriangle"></p>
    </div>

    <div class="frameworkBody">
        <div style="width: 100%; height: 100%;">
            <div style="width: 60%; height: 100%; display: inline-block; padding: 0px;" ref="leftContainer"
                id="leftContainer">

            </div>

            <div style="width: 40%; height: 100%; display: inline-block; padding: 0px;" ref="rightContainer">

            </div>

        </div>
    </div>

</template>

<style></style>