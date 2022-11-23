<template>
  <div class="useraside">
    <!-- im useraside -->
    <!-- 头像昵称 -->
    <div style="margin-top: 50px">
      <el-avatar
        title="点击更换头像"
        class="head"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <p style="margin-top: 5px">username</p>
    </div>
    <p style="margin: 20px 0">个性签名</p>
    <!-- 导航区 -->
    <el-row class="tac">
      <el-col :span="12">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item index="1" @click="changeToUser">
            <el-icon><setting /></el-icon>
            <span>个人资料</span>
          </el-menu-item>
          <el-menu-item index="2" @click="changeToWeiBo">
            <el-icon><document /></el-icon>
            <span>已发布微博</span>
          </el-menu-item>
          <el-menu-item index="3" @click="changeToComment">
            <el-icon><icon-menu /></el-icon>
            <span>已发布评论</span>
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
  // console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath);
};

function changeToUser() {
  router.push({
    name: 'userInfo',
    params: {
      id: 1,
    },
  });
}
function changeToWeiBo() {
  router.push({
    path: '/lookweibo',
  });
}
function changeToComment() {
  router.push({
    path: '/lookcomment',
  });
}
</script>

<style scoped>
.head:hover {
  cursor: pointer;
}
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
  text-align: center;
}
</style>
