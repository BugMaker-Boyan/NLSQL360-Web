<script setup>
import { RouterView } from 'vue-router';

</script>

<template>
    <RouterView style="height: calc(100vh - 20px);"></RouterView>
</template>

<style>

@import './common/font.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

.mini_head {
  width: 100%;
  height: 40px;
  padding: 5px;
  display: flex;
  box-sizing: border-box;
}

.mini_title {
  font-family: "monospace";
  width: 100%;
  height: 30px;
  font-size: 18px;
  font-weight: bold;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  line-height: 30px;
}

.el-table .warning-row {
  background: #a6cee3;
}

.boundary {
  border-style: solid;
  border-width: 0.5px;
  border-color: #d3dce6;
  border-radius: 3px;
}

</style>
