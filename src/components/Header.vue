<template>
  <div class="header">
    <!-- 导航栏 -->
    <!-- default-active	指定页面加载时默认激活菜单的 index -->
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <!-- logo -->
      <div class="logo">
        <img src="../assets/images/logo2.png" style="width: 100%; height: 100%" />
      </div>

      <!-- 首页选项 -->
      <el-menu-item index="1" @click="backToHome"> 首页</el-menu-item>

      <div class="search">
        <!-- 搜索框 -->
        <input type="text" v-model="searchkeyword" placeholder="请输入搜索关键字" />
        <span>
          <el-icon size="18"><Search @click="searchBlogs" /></el-icon>
        </span>
      </div>

      <!-- 关于换头像 -->
      <!-- 下拉菜单 -->
      <el-dropdown class="el-drown">
        <span class="el-dropdown-link">
          <!-- 头像 -->
          <div class="demo-type">
            <!-- 图片头像 -->
            <el-avatar :src="imageUrl" />
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- 点击个人信息，切换路由（利用编程式路由导航） -->
            <el-dropdown-item @click="personInfo">个人信息</el-dropdown-item>
            <el-dropdown-item @click="outTologin">退出登录</el-dropdown-item>
            <!-- <el-dropdown-item disabled>Action 4</el-dropdown-item> -->
            <!-- <el-dropdown-item divided>Action 5</el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, reactive, onMounted } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { router } from '../router/index';
import { useStore } from '../models/index';
import { storeToRefs } from 'pinia';
const store = useStore('publicInfo');
const { useravatar } = storeToRefs(store); //storeToRefs使修改pinia数据时是响应式的

const { proxy } = getCurrentInstance();
const activeIndex = ref('1');
const searchkeyword = ref('');
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath); //得到被选择项的index，及保存有被选择项相关信息的数组
};
let imageUrl = ref(useravatar); //借助pinia使数据能够动态匹配(数据共享)，那么其它地方换了头像，导航栏的头像也会跟着换
onMounted(() => {
  // 获取头像
  proxy.$api.getAvatar({ useraccount: localStorage.getItem('currentuser') }).then(
    (value) => {
      console.log('获取头像', value);
      localStorage.setItem('avatar', changeToUrl(value.data.data.avatar));
      store.useravatar = localStorage.getItem('avatar');
    },
    (reason) => {},
  );
});
// 将后端图片地址进行转义
function changeToUrl(str) {
  let arr = str.split('');
  console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == '\\') {
      arr[i - 1] += '//';
    }
  }
  console.log(arr.join(''));
  return arr.join('');
}
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
  /* window.location.reload(); */
  //选中“首页”
  activeIndex.value = '1';
}

// 搜索框
function searchBlogs() {
  console.log('searchkeyword is', searchkeyword);
  // 应先做判断，
  if (searchkeyword.value) {
    // 再 路由切换 并 传递params参数
    router.replace({
      // 注意params传参只能以name来引导路由
      name: 'search',
      params: {
        keyword: searchkeyword.value,
      },
    });
  } else {
    alert('请输入需要搜索的标题内容！');
  }
}
// 退出登录
function outTologin() {
  // 清除token
  store.clearToken();
  // 清除用户账号
  store.clearUseraccount();
  // 清除用户名
  store.clearUsername();
  // 跳回到登录页
  router.replace({
    path: '/login',
  });
  /*  
  let isMobile = ref(false);
  function getScreen() {
    let screenWidth = document.body.clientWidth; //获取屏幕的宽
    let screenHeight = document.body.clientHeight; //获取屏幕的高
    return screenWidth / screenHeight; //返回宽除以高
  }
  function listenScreen() {
    let initScale = getScreen(); //初始化判断
    if (initScale < 1) {
      //如果小于1说明宽度小于高度，则识别为手机反之为PC
      isMobile.value = true;
    }
    window.addEventListener('resize', () => {
      //添加屏幕变化监听，判断逻辑与上方相同
      isMobile.value = getScreen() < 1 ? true : false;
    });
  }
  onMounted(() => {
    listenScreen();
  }); */
}
</script>

<style lang="scss" scoped>
// 导航栏
.header {
  display: flex;
  flex-wrap: nowrap;
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
  width: 100%;
  // padding-left: 20px;
  position: relative;
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
  position: absolute;
  right: 15rem;
  // margin-right: 5rem;
  line-height: 3.8rem;
  input {
    width: 15rem;
    height: 1.5rem;
    border-radius: 1rem;
    border: 1px solid #999;
    outline: none;
  }
  span {
    vertical-align: middle;
    margin-left: 0.5rem;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
@media screen and (max-width: 750px) {
  .header {
    width: 100%;
    height: 3.8rem;
  }
  .el-menu-demo {
    width: 100%;
  }
  // logo
  .logo {
    width: 18%;
    margin-right: 5%;
  }
  // 首页选项
  .el-menu-item {
    width: 13%;
  }
  // 搜索框
  .search {
    position: absolute;
    width: 40%;
    right: 20%;
    // margin-right: 5rem;
    line-height: 3.8rem;
  }
  .search input {
    width: 80%;
    height: 1.2rem;
    border-radius: 20px;
    border: 1px solid #999;
    outline: none;
    font-size: 12px;
  }
  .search span {
    vertical-align: middle;
    margin-left: 0.2rem;
  }
  // 下拉菜单
  .el-dropdown {
    margin-left: auto; //设置盒子靠右(其父级要有display: flex;) 或使用text-align: right
    margin-right: 5%;
    align-items: center; //子项目垂直居中
    font-size: 12px;
  }
}
</style>
