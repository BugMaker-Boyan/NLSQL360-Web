<script setup>
import { ref } from 'vue'

const dialogSelectDatasetVisible = ref(false)

const handleSelectDataset = () => {
    console.log("handleSelectDataset")
    dialogSelectDatasetVisible.value = true
}

const dialogUploadDatasetVisible = ref(false)

const handleUploadDataset = () => {
    dialogUploadDatasetVisible.value = true
    console.log("handleSelectDataset")
}

const dialogSelectModelVisible = ref(false)

const handleSelectModel = () => {
    dialogSelectModelVisible.value = true
    console.log("handleSelectModel")
}

const dialogUploadModelVisible = ref(false)

const handleUploadModel = () => {
    dialogUploadModelVisible.value = true
    console.log("handleUploadModel")
}

const dialogSelectMetricVisible = ref(false)

const handleSelectMetric = () => {
    dialogSelectMetricVisible.value = true
    console.log("handleSelectMetric")
}

const dialogDefineMetricVisible = ref(false)

const handleDefineMetric = () => {
    dialogDefineMetricVisible.value = true
    console.log("handleDefineMetric")
}

const dialogSelectFilterVisible = ref(false)

const handleSelectFilter = () => {
    dialogSelectFilterVisible.value = true
    console.log("handleSelectFilter")
}

const dialogDefineFilterVisible = ref(false)

const handleDefineFilter = () => {
    dialogDefineFilterVisible.value = true
    console.log("handleDefineFilter")
}

const dialogSelectEvaluationCheckpointVisible = ref(false)

const handleSelectEvaluationCheckpoint = () => {
    dialogSelectEvaluationCheckpointVisible.value = true
    console.log("handleSelectEvaluationCheckpoint")
}

const dialogStartNewEvaluationVisible = ref(false)

const handleStartNewEvaluation = () => {
    dialogStartNewEvaluationVisible.value = true
    console.log("handleStartNewEvaluation")
}

const dialogConfigLLMAPIVisible = ref(false)

const handleConfigLLMAPI = () => {
    dialogConfigLLMAPIVisible.value = true
    console.log("handleConfigLLMAPI")
}


</script>


<template>
    <div class="aside">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="aside-menu"
            default-active="1"
            text-color="#fff"
        >
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Dataset</span>
                </template>
                <el-menu-item @click="handleSelectDataset" index="1-1">Select Dataset</el-menu-item>
                <el-menu-item @click="handleUploadDataset" index="1-2">Upload Dataset</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Model</span>
                </template>
                <el-menu-item @click="handleSelectModel" index="2-1">Select Model</el-menu-item>
                <el-menu-item @click="handleUploadModel" index="2-2">Upload Model</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="3">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Metric</span>
                </template>
                <el-menu-item @click="handleSelectMetric" index="3-1">Select Metric</el-menu-item>
                <el-menu-item @click="handleDefineMetric" index="3-2">Define Metric</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="4">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Filter</span>
                </template>
                <el-menu-item @click="handleSelectFilter" index="4-1">Select Filter</el-menu-item>
                <el-menu-item @click="handleDefineFilter" index="4-2">Define Filter</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="5">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Evaluate</span>
                </template>
                <el-menu-item @click="handleSelectEvaluationCheckpoint" index="5-1">Select Evaluation Checkpoint</el-menu-item>
                <el-menu-item @click="handleStartNewEvaluation" index="5-2">Start New Evaluation</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="6">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>User Setting</span>
                </template>
                <el-menu-item @click="handleConfigLLMAPI" index="6-1">Config LLM API</el-menu-item>
            </el-sub-menu>
        </el-menu>

        <div class="dialogSelectDataset">
            <el-dialog v-model="dialogSelectDatasetVisible" title="Select Dataset" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>

        <div class="dialogUploadDataset">
            <el-dialog v-model="dialogUploadDatasetVisible" title="Upload Dataset" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>
        
        <div class="dialogSelectModel">
            <el-dialog v-model="dialogSelectModelVisible" title="Select Model" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>

        <div class="dialogUploadModel">
            <el-dialog v-model="dialogUploadModelVisible" title="Upload Model" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>

        <div class="dialogSelectMetric">
            <el-dialog v-model="dialogSelectMetricVisible" title="Select Metric" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>

        <div class="dialogDefineMetric">
            <el-dialog v-model="dialogDefineMetricVisible" title="Define Metric" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>

        <div class="dialogSelectFilter">
            <el-dialog v-model="dialogSelectFilterVisible" title="Select Filter" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>

        <div class="dialogDefineFilter">
            <el-dialog v-model="dialogDefineFilterVisible" title="Define Filter" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>

        <div class="dialogSelectEvaluationCheckpoint">
            <el-dialog v-model="dialogSelectEvaluationCheckpointVisible" title="Select Evaluation Checkpoint" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>

        <div class="dialogStartNewEvaluation">
            <el-dialog v-model="dialogStartNewEvaluationVisible" title="Start New Evaluation" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>

        <div class="dialogConfigLLMAPI">
            <el-dialog v-model="dialogConfigLLMAPIVisible" title="Config LLM API" width="300px" draggable>
                <span>span</span>
            </el-dialog>
        </div>
    </div>
</template>

<style scoped>

.aside {
    background: green;
    margin-left: 20px;
}

</style>