<script setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'

const RadarChart = (data, options) => {

    /////////////////////////////////////////////////////////
    /////////////////// Helper Function /////////////////////
    /////////////////////////////////////////////////////////

    //Taken from http://bl.ocks.org/mbostock/7555321
    //Wraps SVG text
    function wrap(text, width) {
        text.each(function () {
            var text = d3.select(this),
                words = text
                    .text()
                    .split(/\s+/)
                    .reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.4, // ems
                y = text.attr("y"),
                x = text.attr("x"),
                dy = parseFloat(text.attr("dy")),
                tspan = text
                    .text(null)
                    .append("tspan")
                    .attr("x", x)
                    .attr("y", y)
                    .attr("dy", dy + "em");

            while ((word = words.pop())) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .text(word);
                }
            }
        });
    } //wrap

    var cfg = {
        w: 600, //Width of the circle
        h: 600, //Height of the circle
        margin: { top: 20, right: 20, bottom: 20, left: 20 }, //The margins of the SVG
        levels: 3, //How many levels or inner circles should there be drawn
        maxValue: 0, //What is the value that the biggest circle will represent
        labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
        opacityArea: 0.35, //The opacity of the area of the blob
        dotRadius: 4, //The size of the colored circles of each blog
        opacityCircles: 0.1, //The opacity of the circles of each blob
        strokeWidth: 2, //The width of the stroke around each blob
        roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.scaleOrdinal(d3.schemeCategory10) //Color function
    };

    //Put all of the options into a variable called cfg
    if ("undefined" !== typeof options) {
        for (var i in options) {
            if ("undefined" !== typeof options[i]) {
                cfg[i] = options[i];
            }
        } //for i
    } //if

    //If the supplied maxValue is smaller than the actual one, replace by the max in the data
    var maxValue = Math.max(
        cfg.maxValue,
        d3.max(data, function (i) {
            return d3.max(
                i.map(function (o) {
                    return o.value;
                })
            );
        })
    );

    var allAxis = data[0].map(function (i, j) {
        return i.axis;
    }), //Names of each axis
        total = allAxis.length, //The number of different axes
        radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
        Format = d3.format("%"), //Percentage formatting
        angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

    //Scale for the radius
    var rScale = d3
        .scaleLinear()
        .range([0, radius])
        .domain([0, maxValue]);

    /////////////////////////////////////////////////////////
    //////////// Create the container SVG and g /////////////
    /////////////////////////////////////////////////////////

    //Calculate width and height
    var height = cfg.h + cfg.margin.top + cfg.margin.bottom;
    var width = cfg.w + cfg.margin.left + cfg.margin.right;

    //Initiate the radar chart SVG
    var svg = d3
        .create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("class", +new Date());

    //Append a g element
    var g = svg
        .append("g")
        .attr(
            "transform",
            "translate(" +
            (cfg.w / 2 + cfg.margin.left) +
            "," +
            (cfg.h / 2 + cfg.margin.top) +
            ")"
        );

    /////////////////////////////////////////////////////////
    ////////// Glow filter for some extra pizzazz ///////////
    /////////////////////////////////////////////////////////

    //Filter for the outside glow
    var filter = g
        .append("defs")
        .append("filter")
        .attr("id", "glow"),
        feGaussianBlur = filter
            .append("feGaussianBlur")
            .attr("stdDeviation", "2.5")
            .attr("result", "coloredBlur"),
        feMerge = filter.append("feMerge"),
        feMergeNode_1 = feMerge.append("feMergeNode").attr("in", "coloredBlur"),
        feMergeNode_2 = feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    /////////////////////////////////////////////////////////
    /////////////// Draw the Circular grid //////////////////
    /////////////////////////////////////////////////////////

    //Wrapper for the grid & axes
    var axisGrid = g.append("g").attr("class", "axisWrapper");

    //Draw the background circles
    axisGrid
        .selectAll(".levels")
        .data(d3.range(1, cfg.levels + 1).reverse())
        .enter()
        .append("circle")
        .attr("class", "gridCircle")
        .attr("r", function (d, i) {
            return (radius / cfg.levels) * d;
        })
        .style("fill", "#CDCDCD")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", cfg.opacityCircles)
        .style("filter", "url(#glow)");

    //Text indicating at what % each level is
    axisGrid
        .selectAll(".axisLabel")
        .data(d3.range(1, cfg.levels + 1).reverse())
        .enter()
        .append("text")
        .attr("class", "axisLabel")
        .attr("x", 4)
        .attr("y", function (d) {
            return (-d * radius) / cfg.levels;
        })
        .attr("dy", "0.4em")
        .style("font-size", "10px")
        .attr("fill", "#737373")
        .text(function (d, i) {
            return Format((maxValue * d) / cfg.levels);
        });

    /////////////////////////////////////////////////////////
    //////////////////// Draw the axes //////////////////////
    /////////////////////////////////////////////////////////

    //Create the straight lines radiating outward from the center
    var axis = axisGrid
        .selectAll(".axis")
        .data(allAxis)
        .enter()
        .append("g")
        .attr("class", "axis");

    //Append the lines
    axis
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", function (d, i) {
            return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("y2", function (d, i) {
            return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .attr("class", "line")
        .style("stroke", "white")
        .style("stroke-width", "2px");

    //Append the labels at each axis
    axis
        .append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", function (d, i) {
            return (
                rScale(maxValue * cfg.labelFactor) *
                Math.cos(angleSlice * i - Math.PI / 2)
            );
        })
        .attr("y", function (d, i) {
            return (
                rScale(maxValue * cfg.labelFactor) *
                Math.sin(angleSlice * i - Math.PI / 2)
            );
        })
        .text(function (d) {
            return d;
        })
        .call(wrap, cfg.wrapWidth);

    /////////////////////////////////////////////////////////
    ///////////// Draw the radar chart blobs ////////////////
    /////////////////////////////////////////////////////////

    //The radial line function
    var radarLine = d3
        .lineRadial()
        .curve(d3.curveBasisClosed)
        .radius(function (d) {
            return rScale(d.value);
        })
        .angle(function (d, i) {
            return i * angleSlice;
        });

    if (cfg.roundStrokes) {
        radarLine.curve(d3.curveCardinalClosed);
    }

    //Create a wrapper for the blobs
    var blobWrapper = g
        .selectAll(".radarWrapper")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "radarWrapper");

    //Append the backgrounds
    blobWrapper
        .append("path")
        .attr("class", "radarArea")
        .attr("d", function (d, i) {
            return radarLine(d);
        })
        .style("fill", function (d, i) {
            return cfg.color(i);
        })
        .style("fill-opacity", cfg.opacityArea)
        .on("mouseover", function (d, i) {
            //Dim all blobs
            d3.selectAll(".radarArea")
                .transition()
                .duration(200)
                .style("fill-opacity", 0.1);
            //Bring back the hovered over blob
            d3.select(this)
                .transition()
                .duration(200)
                .style("fill-opacity", 0.7);
        })
        .on("mouseout", function () {
            //Bring back all blobs
            d3.selectAll(".radarArea")
                .transition()
                .duration(200)
                .style("fill-opacity", cfg.opacityArea);
        });

    //Create the outlines
    blobWrapper
        .append("path")
        .attr("class", "radarStroke")
        .attr("d", function (d, i) {
            return radarLine(d);
        })
        .style("stroke-width", cfg.strokeWidth + "px")
        .style("stroke", function (d, i) {
            return cfg.color(i);
        })
        .style("fill", "none")
        .style("filter", "url(#glow)");

    //Append the circles
    blobWrapper
        .selectAll(".radarCircle")
        .data(function (d, i) {
            return d;
        })
        .enter()
        .append("circle")
        .attr("class", "radarCircle")
        .attr("r", cfg.dotRadius)
        .attr("cx", function (d, i) {
            return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("cy", function (d, i) {
            return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .style("fill", function (d) {
            return "#737373";
        })
        .style("fill-opacity", 0.8);

    /////////////////////////////////////////////////////////
    //////// Append invisible circles for tooltip ///////////
    /////////////////////////////////////////////////////////

    //Wrapper for the invisible circles on top
    var blobCircleWrapper = g
        .selectAll(".radarCircleWrapper")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "radarCircleWrapper");

    //Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper
        .selectAll(".radarInvisibleCircle")
        .data(function (d, i) {
            return d;
        })
        .enter()
        .append("circle")
        .attr("class", "radarInvisibleCircle")
        .attr("r", cfg.dotRadius * 1.5)
        .attr("cx", function (d, i) {
            return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
        })
        .attr("cy", function (d, i) {
            return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
        })
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function (d, i) {
            var newX = parseFloat(d3.select(this).attr("cx")) - 10;
            var newY = parseFloat(d3.select(this).attr("cy")) - 10;

            tooltip
                .attr("x", newX)
                .attr("y", newY)
                .text(Format(d.value))
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseout", function () {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0);
        });

    //Set up the small tooltip for when you hover over a circle
    var tooltip = g
        .append("text")
        .attr("class", "tooltip")
        .style("opacity", 0);

    return svg.node();
} //RadarChart

const BarChart = (data, options) => {
    const margin = options.margin

    const groupKey = options.groupKey
    const keys = options.keys

    const yAxisLable = options.yAxisLable

    const width = options.width
    const height = options.height

    const color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.max(keys, key => d[key]))]).nice()
        .rangeRound([height - margin.bottom, margin.top])

    const x0 = d3.scaleBand()
        .domain(data.map(d => d[groupKey]))
        .rangeRound([margin.left, width - margin.right])
        .paddingInner(0.1)

    const x1 = d3.scaleBand()
        .domain(keys)
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05)

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(yAxisLable))

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x0).tickSizeOuter(0))
        .call(g => g.select(".domain").remove())

    const legend = svg => {
        const g = svg
            .attr("transform", `translate(${width}, 0)`)
            .attr("text-anchor", "end")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("g")
            .data(color.domain().slice().reverse())
            .join("g")
            .attr("transform", (d, i) => `translate(0,${i * 20})`);

        g.append("rect")
            .attr("x", -19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", color);

        g.append("text")
            .attr("x", -24)
            .attr("y", 9.5)
            .attr("dy", "0.35em")
            .text(d => d);
    }

    const svg = d3.create("svg").attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    svg.append("g")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
        .selectAll("rect")
        .data(d => keys.map(key => ({ key, value: d[key] })))
        .join("rect")
        .attr("x", d => x1(d.key))
        .attr("y", d => y(d.value))
        .attr("width", x1.bandwidth())
        .attr("height", d => y(0) - y(d.value))
        .attr("fill", d => color(d.key));

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    svg.append("g")
        .call(legend);

    return svg.node();
}

const leftContainer = ref(null)
const rightContainer = ref(null)


onMounted(() => {
    console.log(leftContainer.value.clientHeight, leftContainer.value.clientWidth)
    //////////////////////////////////////////////////////////////
    ////////////////////////// Data //////////////////////////////
    //////////////////////////////////////////////////////////////

    var data = [
        [
            //iPhone
            { axis: "Battery Life", value: 0.22 },
            { axis: "Brand", value: 0.28 },
            { axis: "Contract Cost", value: 0.29 },
            { axis: "Design And Quality", value: 0.17 },
            { axis: "Have Internet Connectivity", value: 0.22 },
            { axis: "Large Screen", value: 0.02 },
            { axis: "Price Of Device", value: 0.21 },
            { axis: "To Be A Smartphone", value: 0.5 }
        ],
        [
            //Samsung
            { axis: "Battery Life", value: 0.27 },
            { axis: "Brand", value: 0.16 },
            { axis: "Contract Cost", value: 0.35 },
            { axis: "Design And Quality", value: 0.13 },
            { axis: "Have Internet Connectivity", value: 0.2 },
            { axis: "Large Screen", value: 0.13 },
            { axis: "Price Of Device", value: 0.35 },
            { axis: "To Be A Smartphone", value: 0.38 }
        ],
        [
            //Nokia Smartphone
            { axis: "Battery Life", value: 0.26 },
            { axis: "Brand", value: 0.1 },
            { axis: "Contract Cost", value: 0.3 },
            { axis: "Design And Quality", value: 0.14 },
            { axis: "Have Internet Connectivity", value: 0.22 },
            { axis: "Large Screen", value: 0.04 },
            { axis: "Price Of Device", value: 0.41 },
            { axis: "To Be A Smartphone", value: 0.3 }
        ]
    ];

    //////////////////////////////////////////////////////////////
    //////////////////// Draw the Chart //////////////////////////
    //////////////////////////////////////////////////////////////

    const color = d3.scaleOrdinal().range(["#EDC951", "#CC333F", "#00A0B0"]);

    const margin = { top: 30, right: 0, bottom: 30, left: 0 },
        width = rightContainer.value.clientWidth - margin.left - margin.right,
        height = Math.min(
            width,
            rightContainer.value.clientHeight - margin.top - margin.bottom
        );

    const radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: 0.5,
        levels: 5,
        roundStrokes: true,
        color: color
    };

    const radarChartSvg = RadarChart(data, radarChartOptions);

    while (rightContainer.value.firstChild) {
        rightContainer.value.removeChild(rightContainer.value.firstChild);
    }

    rightContainer.value.appendChild(radarChartSvg)

    //////////////////////////////////////////////////////////////
    ////////////////////////// Data //////////////////////////////
    //////////////////////////////////////////////////////////////

    data = [
        {
            "DINSQL": 85,
            "C3SQL": 88,
            "Filter": "JOIN-1", 
        },
        {
            "DINSQL": 85,
            "C3SQL": 88,
            "Filter": "JOIN-2", 
        }
    ]

    const yAxisLable = "EX"
    const groupKey = "Filter"
    const keys = ["DINSQL", "C3SQL"]

    //////////////////////////////////////////////////////////////
    //////////////////// Draw the Chart //////////////////////////
    //////////////////////////////////////////////////////////////

    const barChartSvg = BarChart(data, {
        margin: { top: 10, right: 10, bottom: 20, left: 30 },
        groupKey: groupKey,
        keys: keys,
        yAxisLable: yAxisLable,
        width: leftContainer.value.clientWidth,
        height: leftContainer.value.clientHeight
    })

    while (leftContainer.value.firstChild) {
        leftContainer.value.removeChild(leftContainer.value.firstChild);
    }

    leftContainer.value.appendChild(barChartSvg)

})

</script>

<template>
    <div class="frameworkTitle">
        <div class="title">Angle View</div>
        <p class="titleTriangle"></p>
    </div>

    <div class="frameworkBody">
        <div style="width: 100%; height: 100%;">
            <div style="width: 60%; height: 100%; display: inline-block; padding: 0px;" ref="leftContainer">

            </div>

            <div style="width: 40%; height: 100%; display: inline-block; padding: 0px;" ref="rightContainer">

            </div>

        </div>

    </div>

</template>

<style></style>