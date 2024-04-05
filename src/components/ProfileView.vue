<script setup>
import { ref } from 'vue'

const fullscreenLoading = ref(false)

const datasetSelected = ref('')

const userAvailableDatasets = ref([
    {
        value: "spider",
        label: "spider"
    },
    {
        value: "bird",
        label: "bird"
    }
])

const evaluationsSelected = ref([])

const userAvailableEvaluations = ref([
    {
        value: "DINSQL",
        label: "DINSQL"
    },
    {
        value: "DAILSQL",
        label: "DAILSQL"
    },
    {
        value: "C3SQL",
        label: "C3SQL"
    }
])

const metricsSelected = ref([])

const userAvailableMetrics = ref([
    {
        value: "EX",
        label: "EX"
    },
    {
        value: "EM",
        label: "EM"
    },
    {
        value: "VES",
        label: "VES"
    }
])

const anglesSelected = ref([])

const userAvailableAngles = ref([
    {
        value: "JOIN",
        label: "JOIN"
    },
    {
        value: "ORDER-BY",
        label: "ORDER-BY"
    }
])

const scenariosSelected = ref([])

const userAvailableScenarios = ref([
    {
        value: "Scenerio-1",
        label: "Scenerio-1"
    },
    {
        value: "Sceneraio-2",
        label: "Sceneraio-2"
    }
])

const run = () => {
    fullscreenLoading.value = true
}

</script>

<template>
    <div class="frameworkTitle">
        <div class="title">Profile View</div>
        <p class="titleTriangle"></p>
    </div>

    <div class="frameworkBody">
      
        <div style="height: calc(35% - 10px); width: calc(100%); float: left; border: 0px solid blue; font-size: 14px; font-weight: 600; z-index: 5;">
            <div style="height: calc(35% -  3px);">
                <span style="float: left; font-weight: 600;">
                    Username:
                </span>
                <span style="float: right; width: calc(55% - 3px);">UserName</span>
            </div>

            <div style="height: calc(35% -  3px);">
                <span style="float: left; font-weight: 600; margin-top: 0px;">
                    Upload Dataset:
                </span>
                <el-button style="float: right; width: calc(50% - 3px);">Upload</el-button>
            </div>

            <div style="height: calc(35% -  3px);">
                <span style="float: left; font-weight: 600; margin-top: 0px;">
                    Upload Model:
                </span>
                <el-button style="float: right; width: calc(50% - 3px);">Upload</el-button>
            </div>

        </div>

        <hr style="margin-top: 5px; margin-bottom: 15px">

        <div style="height: calc(55% - 10px); width: calc(100%); float: left; border: 0px solid blue; font-size: 14px; font-weight: 600; z-index: 5;">
            <div style="height: calc(23% -  3px);">
                <span style="float: left; font-weight: 600; margin-top: 0px;">
                    Dataset:
                </span>
                <el-select
                  v-model="datasetSelected"
                  placeholder="Select"
                  style="float: right; width: calc(55% - 3px);"
                >
                    <el-option
                      v-for="item in userAvailableDatasets"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>

            <div style="height: calc(23% -  3px);">
                <span style="float: left; font-weight: 600; margin-top: 0px;">
                    Evaluations:
                </span>
                <el-select
                  v-model="evaluationsSelected"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="1"
                  placeholder="Select"
                  style="float: right; width: calc(55% - 3px);"
                >
                    <el-option
                      v-for="item in userAvailableEvaluations"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>

            <div style="height: calc(23% -  3px);">
                <span style="float: left; font-weight: 600; margin-top: 0px;">
                    Metrics:
                </span>
                <el-select
                  v-model="metricsSelected"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="1"
                  placeholder="Select"
                  style="float: right; width: calc(55% - 3px);"
                >
                    <el-option
                      v-for="item in userAvailableMetrics"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>

            <div style="height: calc(23% -  3px);">
                <span style="float: left; font-weight: 600; margin-top: 0px;">
                    Angles:
                </span>
                <el-select
                  v-model="anglesSelected"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="1"
                  placeholder="Select"
                  style="float: right; width: calc(55% - 3px);"
                >
                    <el-option
                      v-for="item in userAvailableAngles"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>

            <div style="height: calc(23% -  3px);">
                <span style="float: left; font-weight: 600; margin-top: 0px;">
                    Scenarios:
                </span>
                <el-select
                  v-model="scenariosSelected"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="1"
                  placeholder="Select"
                  style="float: right; width: calc(55% - 3px);"
                >
                    <el-option
                      v-for="item in userAvailableScenarios"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>

            <div style="height: calc(23% -  3px);">
                <el-button style="float: left; width: calc(100% - 3px)">
                    Generate Evaluation Report
                </el-button>
            </div>

        </div>
    </div>
</template>

<style>
.el-loading-spinner {
    font-size: 80px;
    font-weight: normal;
}

.el-loading-mask .el-loading-spinner .el-loading-text {
    font-size: 25px;
}

.el-upload-list {
    margin-top: 0px;
    width: 180px;
    transform: translate(-100px, -30px);
}

.dataSetClass .el-input__inner {
    font-weight: 600;
    text-align: center;
    border: 0px;
}

.el-button {
    padding: 0px;
    padding-top: 2px;
}

.el-input__wrapper {
    height: 30px;
}

.el-table .warning-row {
    background-color: #ebebeb;
}

.el-table .cell {
    text-align: left;
}

.vertical-align {
    display: inline-block;
    vertical-align: middle;
}
</style>