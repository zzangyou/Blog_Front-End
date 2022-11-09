<template>
  <div class="header">

    <!-- 导航栏 -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <!-- logo -->
      <div class="logo">logo</div>

      <!-- 首页选项 -->
      <el-menu-item index="1">首页</el-menu-item>

      <!-- 关于换头像？？？ -->
      <!-- 下拉菜单 -->
      <el-dropdown class="el-drown">
        <span class="el-dropdown-link">
          <!-- 头像 -->
          <div class="demo-type">
            <!-- 图片头像 -->
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- 点击个人信息，切换路由（利用编程式路由导航） -->
            <el-dropdown-item @click="personInfo">个人信息</el-dropdown-item>
            <!-- <el-dropdown-item>Action 2</el-dropdown-item> -->
            <!-- <el-dropdown-item disabled>Action 4</el-dropdown-item> -->
            <!-- <el-dropdown-item divided>Action 5</el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import  {router}  from '../router/index';

const activeIndex = ref('1');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath); //得到被选择项的index，即保存有被选择项相关信息的数组
};
function personInfo() {
  // 路由切换
  console.log(this);
  router.push({
    name: 'userInfo',
    params: {
      id: 1,
    },
  });
}
</script>

<style lang="scss">
// 导航栏
.el-menu-demo {
  display: flex;
  // padding-left: 20px;
}
// logo
.logo {
  width: 150px;
  height: 60px;
  line-height: 60px;
  background-color: skyblue;
  margin-right: 50px;
}
// 下拉菜单
.el-dropdown {
  margin-left: auto; //设置盒子靠右(其父级要有display: flex;) 或使用text-align: right
  margin-right: 80px;
  align-items: center; //子项目垂直居中
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
// 头像
/* .demo-type {
} */
/* .demo-type > div {
  flex: 1;
  text-align: center;
} */

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  // box-sizing盒子模型，即border和padding不会撑大盒子(在border和padding不超过width和height的情况下)
  box-sizing: border-box;
  // padding: 20px 40px;
  // background-color: skyblue;
}
</style>
