<script setup>
import HeaderUser from './HeaderUser.vue'

</script>

<template>
    <div class="header">
        <el-row justify="space-between">
            <el-col :span="12">
                <div class="header-title">
                    <span>NLSQL360</span>
                </div>
            </el-col>
            <el-col :span="12" class="header-user-col">
                <div class="header-user">
                    <HeaderUser></HeaderUser>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>

.header {
    background-color: gray;
}

.header .header-title {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
}

.header .header-user {
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: right;
    padding: 0 20px;
    align-items: center;
}

</style>