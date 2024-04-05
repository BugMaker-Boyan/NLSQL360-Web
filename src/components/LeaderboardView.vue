<script setup>
import { ref, defineProps, onMounted } from 'vue'
import * as d3 from 'd3'
import * as d3Sankey from "d3-sankey"

const chroma = 0.2
const lightnessStart = 0.85
const hueStart = 0.7
const lightnessRange = 0.15
const hueRange = 0.45

const gamma = x => (x >= 0.0031308 ? 1.055 * Math.pow(x, 1 / 2.4) - 0.055 : 12.92 * x)

const oklab = (L, a, b) => {
  const l_ = 0.99999999845 * L + 0.39633779217 * a + 0.21580375806 * b;
  const m_ = 1.00000000888 * L - 0.10556134232 * a - 0.06385417477 * b;
  const s_ = 1.00000005467 * L - 0.08948418209 * a - 1.29148553786 * b;
  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return d3.rgb(
    255 * gamma(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    255 * gamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    255 * gamma(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)
  );
}

const polarOKLab = function(lightness, chroma, hueAngle) {
  const h = 2 * Math.PI * (hueAngle / 360);
  const a = chroma * Math.cos(h)
  const b = chroma * Math.sin(h)
  
  return oklab(lightness, a, b)
}

const rank_data = [
    {
        "model": "DAILSQL(SC)",
        "ex": "95.8%",
        "rank_overall": 1,
        "rank_join": 2
    },
    {
        "model": "DINSQL",
        "ex": "94.0%",
        "rank_overall": 2,
        "rank_join": 1
    },
    {
        "model": "C3SQL",
        "ex": "94.0%",
        "rank_overall": 3,
        "rank_join": 3
    }
];


// const rank_data = [
//     { "Province": "Beijing", 
//     "地区": "北京市", 
//     "GDP Per Capita": 190205, 
//     "GDP Per Capita Rank": 1, 
//     "Tax PerCapita": 2.22851191, 
//     "Tax PerCapita Rank": 2, 
//     "211 % (2022)": 13.99, "211 % (2022) Rank": 1 
// }, { 
//     "Province": "Shanghai", "地区": "上海市", "GDP Per Capita": 181046, "GDP Per Capita Rank": 2, "Tax PerCapita": 2.56532121, "Tax PerCapita Rank": 1, "211 % (2022)": 13.58, "211 % (2022) Rank": 2 }, { "Province": "Tibet", "地区": "西藏自治区", "GDP Per Capita": 59071, "GDP Per Capita Rank": 24, "Tax PerCapita": 0.29159341, "Tax PerCapita Rank": 24, "211 % (2022)": 12.77, "211 % (2022) Rank": 3 }, { "Province": "Tianjin", "地区": "天津市", "GDP Per Capita": 118358, "GDP Per Capita Rank": 6, "Tax PerCapita": 0.98821717, "Tax PerCapita Rank": 4, "211 % (2022)": 12.68, "211 % (2022) Rank": 4 }, { "Province": "Qinghai", "地区": "青海省", "GDP Per Capita": 60895, "GDP Per Capita Rank": 22, "Tax PerCapita": 0.42998319, "Tax PerCapita Rank": 14, "211 % (2022)": 11.66, "211 % (2022) Rank": 5 }, { "Province": "Jilin", "地区": "吉林省", "GDP Per Capita": 54591, "GDP Per Capita Rank": 27, "Tax PerCapita": 0.24302811, "Tax PerCapita Rank": 29, "211 % (2022)": 8.95, "211 % (2022) Rank": 6 }, { "Province": "Ningxia", "地区": "宁夏回族自治区", "GDP Per Capita": 70118, "GDP Per Capita Rank": 16, "Tax PerCapita": 0.42146978, "Tax PerCapita Rank": 15, "211 % (2022)": 8.56, "211 % (2022) Rank": 7 }, { "Province": "Xinjiang", "地区": "新疆维吾尔自治区", "GDP Per Capita": 69743, "GDP Per Capita Rank": 17, "Tax PerCapita": 0.4724855, "Tax PerCapita Rank": 12, "211 % (2022)": 7.76, "211 % (2022) Rank": 8 }, { "Province": "Heilongjiang", "地区": "黑龙江省", "GDP Per Capita": 51085, "GDP Per Capita Rank": 30, "Tax PerCapita": 0.25600839, "Tax PerCapita Rank": 27, "211 % (2022)": 6.67, "211 % (2022) Rank": 9 }, { "Province": "Jiangxi", "地区": "江西省", "GDP Per Capita": 68935, "GDP Per Capita Rank": 18, "Tax PerCapita": 0.3950773, "Tax PerCapita Rank": 19, "211 % (2022)": 6.46, "211 % (2022) Rank": 10 }, { "Province": "Inner Mongolia", "地区": "内蒙古自治区", "GDP Per Capita": 97413, "GDP Per Capita Rank": 8, "Tax PerCapita": 0.88896293, "Tax PerCapita Rank": 5, "211 % (2022)": 6.03, "211 % (2022) Rank": 11 }, { "Province": "Liaoning", "地区": "辽宁省", "GDP Per Capita": 68682, "GDP Per Capita Rank": 19, "Tax PerCapita": 0.3965666, "Tax PerCapita Rank": 17, "211 % (2022)": 5.93, "211 % (2022) Rank": 12 }, { "Province": "Shaanxi", "地区": "陕西省", "GDP Per Capita": 83008, "GDP Per Capita Rank": 12, "Tax PerCapita": 0.6781724, "Tax PerCapita Rank": 9, "211 % (2022)": 5.67, "211 % (2022) Rank": 13 }, { "Province": "Hainan", "地区": "海南省", "GDP Per Capita": 67084, "GDP Per Capita Rank": 21, "Tax PerCapita": 0.59331061, "Tax PerCapita Rank": 10, "211 % (2022)": 5.66, "211 % (2022) Rank": 14 }, { "Province": "Chongqing", "地区": "重庆市", "GDP Per Capita": 88938, "GDP Per Capita Rank": 10, "Tax PerCapita": 0.39556178, "Tax PerCapita Rank": 18, "211 % (2022)": 5.38, "211 % (2022) Rank": 15 }, { "Province": "Fujian", "地区": "福建省", "GDP Per Capita": 123603, "GDP Per Capita Rank": 4, "Tax PerCapita": 0.49960841, "Tax PerCapita Rank": 11, "211 % (2022)": 5.37, "211 % (2022) Rank": 16 }, { "Province": "Jiangsu", "地区": "江苏省", "GDP Per Capita": 143381, "GDP Per Capita Rank": 3, "Tax PerCapita": 0.79896888, "Tax PerCapita Rank": 6, "211 % (2022)": 5.19, "211 % (2022) Rank": 17 }, { "Province": "Guizhou", "地区": "贵州省", "GDP Per Capita": 51894, "GDP Per Capita Rank": 28, "Tax PerCapita": 0.26497925, "Tax PerCapita Rank": 25, "211 % (2022)": 5.17, "211 % (2022) Rank": 18 }, { "Province": "Hubei", "地区": "湖北省", "GDP Per Capita": 90249, "GDP Per Capita Rank": 9, "Tax PerCapita": 0.41266941, "Tax PerCapita Rank": 16, "211 % (2022)": 5.16, "211 % (2022) Rank": 19 }, { "Province": "Shanxi", "地区": "山西省", "GDP Per Capita": 73495, "GDP Per Capita Rank": 13, "Tax PerCapita": 0.77464809, "Tax PerCapita Rank": 7, "211 % (2022)": 4.67, "211 % (2022) Rank": 20 }, { "Province": "Guangxi", "地区": "广西壮族自治区", "GDP Per Capita": 51884, "GDP Per Capita Rank": 29, "Tax PerCapita": 0.18434119, "Tax PerCapita Rank": 31, "211 % (2022)": 4.61, "211 % (2022) Rank": 21 }, { "Province": "Hunan", "地区": "湖南省", "GDP Per Capita": 72014, "GDP Per Capita Rank": 15, "Tax PerCapita": 0.30352211, "Tax PerCapita Rank": 22, "211 % (2022)": 4.53, "211 % (2022) Rank": 22 }, { "Province": "Yunnan", "地区": "云南省", "GDP Per Capita": 60848, "GDP Per Capita Rank": 23, "Tax PerCapita": 0.25512892, "Tax PerCapita Rank": 28, "211 % (2022)": 4.5, "211 % (2022) Rank": 23 }, { "Province": "Shandong", "地区": "山东省", "GDP Per Capita": 86172, "GDP Per Capita Rank": 11, "Tax PerCapita": 0.47186067, "Tax PerCapita Rank": 13, "211 % (2022)": 4.44, "211 % (2022) Rank": 24 }, { "Province": "Sichuan", "地区": "四川省", "GDP Per Capita": 67602, "GDP Per Capita Rank": 20, "Tax PerCapita": 0.37633509, "Tax PerCapita Rank": 20, "211 % (2022)": 4.44, "211 % (2022) Rank": 25 }, { "Province": "Hebei", "地区": "河北省", "GDP Per Capita": 56587, "GDP Per Capita Rank": 26, "Tax PerCapita": 0.30227628, "Tax PerCapita Rank": 23, "211 % (2022)": 4.42, "211 % (2022) Rank": 26 }, { "Province": "Zhejiang", "地区": "浙江省", "GDP Per Capita": 118687, "GDP Per Capita Rank": 5, "Tax PerCapita": 1.00658811, "Tax PerCapita Rank": 3, "211 % (2022)": 4.4, "211 % (2022) Rank": 27 }, { "Province": "Henan", "地区": "河南省", "GDP Per Capita": 58974, "GDP Per Capita Rank": 25, "Tax PerCapita": 0.26240579, "Tax PerCapita Rank": 26, "211 % (2022)": 4.14, "211 % (2022) Rank": 28 }, { "Province": "Anhui", "地区": "安徽省", "GDP Per Capita": 72805, "GDP Per Capita Rank": 14, "Tax PerCapita": 0.36668843, "Tax PerCapita Rank": 21, "211 % (2022)": 4.1, "211 % (2022) Rank": 29 }, { "Province": "Gansu", "地区": "甘肃省", "GDP Per Capita": 44628, "GDP Per Capita Rank": 31, "Tax PerCapita": 0.23386437, "Tax PerCapita Rank": 30, "211 % (2022)": 3.5, "211 % (2022) Rank": 30 }, { "Province": "Guangdong", "地区": "广东省", "GDP Per Capita": 102325, "GDP Per Capita Rank": 7, "Tax PerCapita": 0.73367386, "Tax PerCapita Rank": 8, "211 % (2022)": 2.74, "211 % (2022) Rank": 31 }];

const initLeaderboardChart = () => {
    const textWidth = 400;
    const width = 600;

    const padding = 15;
    const margin = 2;
    const strokeWidth = 2;
    const gap = 5;
    const nameHeight = 12;
    const stageWidth = Math.min(textWidth, width);
    const middleWidth = Math.max(100, stageWidth - 2 * textWidth / 3 - 2 * nameHeight);
    const nameWidth = (stageWidth - middleWidth) / 2;
    const sectionHeight = nameHeight + gap + 2 * padding;

    const shuffledTeam = rank_data.map((row, i) => {
        const l = lightnessStart - ((rank_data.length - 1 - i) / rank_data.length) * lightnessRange;
        const h = i / rank_data.length * 360 * hueRange + hueStart * 360;
        return {
            name: row.model,
            label: row.model,
            position: row.rank_overall - 1,
            color: polarOKLab(l, chroma, h)
        };
    });

    const height = sectionHeight * shuffledTeam.length - gap;

    var div = d3.create("div").style("max-width", `${textWidth}px`).attr('xml:space', 'preserve').style("font-family", "sans-serif")
    div.append('text').style("font-weight", "bold").style("font-style", "italic").text('Overall vs. JOIN')

    const namesDiv = div.append("div").style("position", "relative")
    const alphaDiv = namesDiv.append("div").style("width", `${nameWidth}px`).style("display", "grid").style("grid-gap", gap + "px")

    const alphaName = alphaDiv.selectAll(".name")
        .data(shuffledTeam, d => d.name)
        .join("div")
        .attr("class", "name")
        .style("display", "flex")
        .style("background", d => polarOKLab(0.97, 0.008, 240))
        .style("height", `${nameHeight + 2 * padding}px`)
        .style("overflow", "hidden")
        .style("font-size", `${nameHeight}px`)
        .style("font-weight", 500)
        .style("line-height", `${nameHeight}px`)
        .style("border-radius", "4px")

    alphaName.append("div")
        .style("padding", `${padding}px`)
        .style("flex-grow", 1)
        .text((d, i) => d.name);

    alphaName.append("div")
        .attr("class", "swatch")
        .style("border-radius", "3px")
        .style("margin", margin + "px")
        .style("width", nameHeight + 2 * padding - 2 * margin + "px")
        .style("font-size", nameHeight - 2 + "px")
        .style("line-height", nameHeight + 2 * padding - 2 * margin + "px")
        .style("color", "white")
        .style("text-align", "center")
        .style("background", d => d.color)
        .text(d => d.position + 1)

    const shuffledDiv = namesDiv.append("div")
        .style("width", `${nameWidth}px`)
        .style("position", "absolute")
        .style("top", 0)
        .style("right", 0)

    const t = shuffledDiv.transition()
        .duration(1000);

    const shuffledName = shuffledDiv.selectAll(".name")
        .data(shuffledTeam, d => d.name)
        .join(
            enter => enter.append("div")
                .attr("class", "name")
                .style("position", "absolute")
                .style("display", "flex")
                .style("width", "100%")
                .style("background", d => polarOKLab(0.97, 0.008, 240))
                .style("height", `${nameHeight + 2 * padding}px`)
                .style("overflow", "hidden")
                .style("font-size", `${nameHeight}px`)
                .style("font-weight", 500)
                .style("line-height", `${nameHeight}px`)
                .style("border-radius", "4px")
                .style("left", "0px")
                .style("top", (d, i) => i * sectionHeight + "px")
        )

    const shuffledNameSwatch = shuffledName.append("div")
        .attr("class", "swatch")
        .style("border-radius", "3px")
        .style("margin", margin + "px")
        .style("width", nameHeight + 2 * padding - 2 * margin + "px")
        .style("font-size", nameHeight - 2 + "px")
        .style("line-height", nameHeight + 2 * padding - 2 * margin + "px")
        .style("color", "white")
        .style("text-align", "center")
        .style("background", d => d.color)
        .text((d, i) => i + 1)

    shuffledName.append("div")
        .style("padding", `${padding}px`)
        .text((d, i) => d.name);

    const namesSVG = namesDiv.append("svg")
        .attr("width", middleWidth)
        .attr("height", height)
        .style("position", "absolute")
        .style("top", 0)
        .style("left", `${nameWidth}px`)
        .style("pointer-events", "none")

    const connections = namesSVG.append("g");

    const connection = connections.selectAll("g")
        .data(shuffledTeam)
        .join("g")
        .attr("fill", "none")
        .attr("stroke-width", strokeWidth)
        .attr("stroke", d => d.color)
        .attr("transform", `translate(0, ${sectionHeight / 2})`)

    const link = d3.linkHorizontal()

    let whitePath = connection.append("path")
        .attr("stroke", "white")
        .attr("stroke-width", strokeWidth + 2 * 2)
        .attr("d", (d, i) => {
            const x2 = 0;
            const y2 = i * sectionHeight;
            const x1 = middleWidth - 4;
            const y1 = i * sectionHeight;
            return link({ source: [x1, y1], target: [x2, y2] })
        })

    let coloredPath = connection.append("path")
        .style("stroke-dashArray", "8, 2")
        .attr("d", (d, i) => {
            const x2 = 0;
            const y2 = i * sectionHeight;
            const x1 = middleWidth - 4;
            const y1 = i * sectionHeight;
            return link({ source: [x1, y1], target: [x2, y2] })
        })

    let arrowHead = connection.append("path")
        .attr("d", d => `M${middleWidth - 4},0 m-4,-4 l4,4 l-4,4`)
        .attr("transform", (d, i) => `translate(0, ${i * sectionHeight})`)

    function update(shuffledTeam) {
        const duration = 500
        const delay = (d, i) => d.position * 50;

        shuffledName
            .data(shuffledTeam, d => d.name)
            .transition().duration(duration).delay(delay)
            .style("top", d => d.position * sectionHeight + "px")

        shuffledNameSwatch
            .data(shuffledTeam, d => d.name)
            .transition().duration(duration).delay(delay)
            .text(d => d.position + 1)

        arrowHead
            .data(shuffledTeam, d => d.name)
            .transition().duration(duration).delay(delay)
            .attr("transform", d => `translate(0, ${d.position * sectionHeight})`)

        coloredPath
            .data(shuffledTeam, d => d.name)
            .transition().duration(duration).delay((d, i) => d.position * 50)
            .attr("d", (d, i) => {
                const x2 = 0;
                const y2 = i * sectionHeight;
                const x1 = middleWidth - 4;
                const y1 = d.position * sectionHeight;
                return link({ source: [x1, y1], target: [x2, y2] })
            })

        whitePath
            .data(shuffledTeam, d => d.name)
            .transition().duration(duration).delay(delay)
            .attr("d", (d, i) => {
                const x2 = 0;
                const y2 = i * sectionHeight;
                const x1 = middleWidth - 4;
                const y1 = d.position * sectionHeight;
                return link({ source: [x1, y1], target: [x2, y2] })
            })
    }

    return Object.assign(div.node(), { update });
}

onMounted(() => {
    const container = document.getElementById('leaderboardview-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const svg = initLeaderboardChart()
    container.appendChild(svg);

    const shuffledTaxProvince = rank_data.map((d, i) => {
        return {
            name: d.model,
            position: d.rank_join - 1,
            label: d.model
        };
        });

        svg.update(shuffledTaxProvince)
})

</script>

<template>
    <div class="frameworkTitle">
        <div class="title">Leaderboard View</div>
        <p class="titleTriangle"></p>
    </div>

    <div class="frameworkBody">
        <div id="leaderboardview-container"></div>
    </div>

</template>

<style></style>