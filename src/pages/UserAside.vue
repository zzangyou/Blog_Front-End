<template>
  <div class="useraside">
    <!-- im useraside -->
    <!-- 头像昵称 -->

    <!-- 导航区 -->
    <el-row class="tac">
      <el-col :span="12">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="1">
            <el-icon><setting /></el-icon>
            <span>个人资料</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><document /></el-icon>
            <span @click="changeToWeiBo">已发布微博</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><icon-menu /></el-icon>
            <span @click="changeToComment">已发布评论</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
import { router } from '../router/index';
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

function changeToWeiBo() {
  router.push({
    path: '/user/lookweibo',
  });
}
function changeToComment() {
  router.push({
    path: '/user/lookcomment',
  });
}
</script>

<style scoped>
/* .tac {
  width: 100%;
} */
/* 设置该侧边导航宽度等，需要用控制台才能找到该元素来更改 */
.el-col-12 {
  max-width: 100%;
  flex: 0 0 100%;
}

.useraside {
  height: 500px;
}
</style>