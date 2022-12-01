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
        <span>
          <el-icon size="18"><Search /></el-icon>
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

<style lang="scss" scoped>
// 导航栏
.header {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.8rem;
  // box-sizing盒子模型，即border和padding不会撑大盒子(在border和padding不超过width和height的情况下)
  box-sizing: border-box;
  // padding: 20px 40px;
  // background-color: skyblue;
}
.el-menu--horizontal {
  height: 100%;
}
.el-menu-demo {
  display: flex;
  // padding-left: 20px;
}
// logo
.logo {
  width: 7rem;
  height: 100%;
  line-height: 3.8rem;
  background-color: skyblue;
  margin-right: 3rem;
}
// 下拉菜单
.el-dropdown {
  margin-left: auto; //设置盒子靠右(其父级要有display: flex;) 或使用text-align: right
  margin-right: 5rem;
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

.search {
  margin-left: 50rem;
  line-height: 3.8rem;
  input {
    width: 15rem;
    height: 1.5rem;
    border-radius: 15px;
    border: 1px solid #999;
    outline: none;
  }
  span {
    vertical-align: middle;
    margin-left: 0.5rem;
  }
}
</style>
