<template>
  <div class="header">
    <!-- 导航栏 -->
    <!-- default-active	指定页面加载时默认激活菜单的 index -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <!-- logo -->
      <div class="logo">logo</div>

      <!-- 首页选项 -->
      <el-menu-item index="1" @click="backToHome">首页</el-menu-item>

      <div class="search">
        <!-- 搜索框 -->
        <input type="text" v-model="searchkeyword" placeholder="请输入搜索关键字" />
        <span style="vertical-align: middle; margin-left: 3px">
          <el-icon size="18px"><Search /></el-icon>
        </span>
      </div>

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
            <!-- <el-dropdown-item>退出登录</el-dropdown-item> -->
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
import { router } from '../router/index';

const activeIndex = ref('1');
const searchkeyword = ref('');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath); //得到被选择项的index，及保存有被选择项相关信息的数组
};
// 跳去个人信息页
function personInfo() {
  // console.log(this); //undefined
  router.push({
    // push模式切换路由
    name: 'userInfo',
    params: {
      id: 1,
    },
  });
  //取消选中“首页”
  activeIndex.value = '';
}
// 跳回首页
function backToHome() {
  router.replace({
    //replace模式
    path: '/',
  });
  //选中“首页”
  activeIndex.value = '1';
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
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  // box-sizing盒子模型，即border和padding不会撑大盒子(在border和padding不超过width和height的情况下)
  box-sizing: border-box;
  // padding: 20px 40px;
  // background-color: skyblue;
}
.search {
  margin-left: 950px;
  line-height: 60px;
  input {
    width: 200px;
    height: 20px;
    border-radius: 15px;
    border: 1px solid #999;
    outline: none;
  }
}
</style>
