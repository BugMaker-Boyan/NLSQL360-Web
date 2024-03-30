<script setup>

</script>

<template>
    <div class="option-aside">
        <el-descriptions title="Current Options" direction="vertical" :column="2" border>
            <el-descriptions-item label="Dataset">Spider</el-descriptions-item>
            <el-descriptions-item label="#">-</el-descriptions-item>
            <el-descriptions-item label="Models" span="2">
                <el-checkbox label="DINSQL" border />
            </el-descriptions-item>
            <el-descriptions-item label="Metric">Metric</el-descriptions-item>
            
            <!-- <el-descriptions-item label="Models">DINSQL</el-descriptions-item>s -->

        </el-descriptions>
    </div>

</template>

<style scoped>

.option-aside {
    background-color: aqua;
}

</style>