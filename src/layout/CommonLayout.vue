<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TopicReco from '@/components/TopicReco.vue';
</script>
<template>
  <div class="common-layout">
    <el-container>
      <Header />
      <el-container>
        <el-container class="main">
          <el-aside>
            <!-- 一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件 -->
            <router-view name="aside"></router-view>
          </el-aside>

          <el-main>
            <router-view name="default"></router-view>
          </el-main>

          <el-aside>
            <topic-reco></topic-reco>
          </el-aside>
        </el-container>

        <el-footer>im Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.el-aside {
  flex: 1;
}
.el-main {
  flex: 3;
}
.main {
  margin-top: 56px;
  height: 100%;
}
</style>
