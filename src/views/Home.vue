<script setup>
import Aside from '../components/Aside.vue'
import Canvas from '../components/Canvas.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import OptionAside from '../components/OptionAside.vue'
import Main from '../components/Main.vue'
import { useUserData } from '../store/index'
import { ref } from 'vue'

</script>

<template>
  <div class="common-layout" style="width: 100%; height: 100vh; background-color: #e6e6e6;">
    <!-- <el-container>
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
    </el-container> -->
    <Main></Main>
  </div>
</template>
  
<style scoped>

</style>