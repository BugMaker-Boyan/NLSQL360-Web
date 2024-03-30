<script setup>
import ChartCard from './ChartCard.vue'
import { ref } from 'vue'

const items = ref([
    {
        title: "Overall"
    },
    {
        title: "Domain Adaptation"
    }
])

</script>

<template>
    <div class="canvas">
        <el-collapse>
            <el-collapse-item v-for="item of items" :title="item.title">
                <!-- Async component -->
                <Suspense #default>
                    <template>
                        <ChartCard></ChartCard>
                    </template>
                </Suspense>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style scoped>

.canvas {
    background-color: burlywood;
}

</style>