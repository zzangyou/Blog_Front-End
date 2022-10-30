<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TopicReco from '@/components/TopicReco.vue'
</script>
<template>
<div class="common-layout" 
>
<el-container>
    <Header />
  <el-container>
    <el-container>
       <el-aside>
    <router-view name="aside">
   </router-view>
 </el-aside> 
      <el-main >
         <router-view name="default"></router-view>
      </el-main>
       <topic-reco></topic-reco>

    </el-container>   
       <el-footer>im Footer</el-footer>
  </el-container>
</el-container>

</div>

</template>

<style lang="scss">

</style>
