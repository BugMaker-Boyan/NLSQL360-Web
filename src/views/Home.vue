<script setup>
import Aside from '../components/Aside.vue'
import Canvas from '../components/Canvas.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import OptionAside from '../components/OptionAside.vue'

</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside>
          <Aside></Aside>
        </el-aside>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="19"><Canvas></Canvas></el-col>
            <el-col :span="5"><OptionAside></OptionAside></el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-footer>
          <Footer></Footer>
      </el-footer>
    </el-container>
    <!-- <el-backtop :right="100" :bottom="100" /> -->
  </div>
</template>
  
<style scoped>

</style>