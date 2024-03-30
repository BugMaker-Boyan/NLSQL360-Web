<script setup>
import { onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'
import service from '../request/request'

const chart = ref()

// const data = await service.get('api').then(res => res.data.result)

const option = reactive(
    {
        xAxis: {},
        yAxis: {},
        series: [
            {
                symbolSize: 20,
                data: [
                    [10.0, 8.04],
                    [8.07, 6.95],
                    [13.0, 7.58],
                    [9.05, 8.81],
                    [11.0, 8.33],
                    [14.0, 7.66],
                    [13.4, 6.81],
                    [10.0, 6.33],
                    [14.0, 8.96],
                    [12.5, 6.82],
                    [9.15, 7.2],
                    [11.5, 7.2],
                    [3.03, 4.23],
                    [12.2, 7.83],
                    [2.02, 4.47],
                    [1.05, 3.33],
                    [4.05, 4.96],
                    [6.03, 7.24],
                    [12.0, 6.26],
                    [12.0, 8.84],
                    [7.08, 5.82],
                    [5.02, 5.68]
                ],
                type: 'scatter'
            }
        ]
    }
)

onMounted(() => {
    const chartObj = echarts.init(chart.value)
    chartObj.setOption(option)
})

</script>

<template>
    <el-card class="card">
        <template #header>
            <span>Card Name</span>
        </template>
        <div class="chart" ref="chart"></div>
        <template #footer>Footer content</template>
    </el-card>
</template>

<style scoped>

.card {
    width: 300px;
    height: 300px;
}

.chart {
    width: 100%;
    height: 200px;
}

</style>