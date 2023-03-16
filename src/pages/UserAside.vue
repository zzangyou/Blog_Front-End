<template>
  <div class="useraside">
    <!-- im useraside -->
    <!-- 头像昵称 -->
    <div style="margin-top: 3rem; padding-top: 2rem">
      <!-- action 请求url 这里的data为额外参数 -->
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :data="formData"
        :show-file-list="false"
        name="avater"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <!-- on-success	文件上传成功时的钩子。
            before-upload	上传文件之前的钩子，参数为上传的文件，
            若返回false或者返回 Promise 且被 reject，则停止上传。 -->
        <el-avatar title="点击更换头像" class="head" v-if="imageUrl" :src="imageUrl" />
      </el-upload>
      <p style="margin-top: 5px">{{ username }}</p>
    </div>
    <p style="margin-top: 10px; font-size: 14px">{{ usercharacter }}</p>
    <!-- 导航区 -->
    <el-row class="tac" style="margin-top: 2rem; padding-bottom: 3rem">
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
          <!-- <el-menu-item index="3" @click="changeToComment">
            <el-icon><icon-menu /></el-icon>
            <span>已发布评论</span>
          </el-menu-item> -->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue';
import { router } from '../router/index';
import { getCurrentInstance, ref, onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import UploadProps from 'element-plus';
//🔷这里用到piana
import { useStore } from '../models/index.js';
import { storeToRefs } from 'pinia';
import config from '../config';

// 传入需要获取的pinia数据的模块
const store = useStore('publicInfo');
console.log('In UserAside store is ', store);
//利用pinia的storeToRefs函数，将state中的数据变为了响应式的
const { username, usercharacter, useravatar } = storeToRefs(store); //对象解构赋值

const { proxy } = getCurrentInstance(); //记得要加{ }!!!!!

const uploadUrl = config.baseApi + 'blog/uploadAvater';
let imageUrl = useravatar;

let formData = reactive({
  useraccount: localStorage.getItem('currentuser'),
});

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
/* function changeToComment() {
  router.push({
    path: '/lookcomment',
  });
} */

/* onMounted(() => {
  // 获取头像
  proxy.$api.getAvatar({ useraccount: localStorage.getItem('currentuser') }).then(
    (value) => {
      console.log('获取头像', value);
      localStorage.setItem('avatar', changeToUrl(value.data.data.avatar));
      store.useravatar = localStorage.getItem('avatar');
    },
    (reason) => {},
  ); 
  store.useravatar = localStorage.getItem('avatar');
  // if (localStorage.getItem('avatar') != '') {
  //   store.useravatar = localStorage.getItem('avatar');
  // } else {
  //   store.useravatar = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
  // }
});*/
// 文件上传成功时
const handleAvatarSuccess = (response, uploadFile) => {
  console.log('response', response);
  console.log('uploadFile', uploadFile);
  if (typeof uploadFile.raw != 'undefined' && uploadFile.raw != 'null') {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw);
    console.log(response.avater); //http:\43.139.169.47:8080\public\icon\1674024245.jpg
    let img = changeToUrl(response.avater); //转义
    store.useravatar = img;
    localStorage.setItem('avatar', img);
  }
};
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
// 上传文件之前
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    //判断所上传的文件的文件类型
    ElMessage.error('所上传头像必须为jpg格式!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('所上传头像大小不能超过2MB!');
    return false;
  }
  return true;
};
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
  box-sizing: border-box;
  /* height: 35rem; */
  text-align: center;
  background-color: #fff;
  margin-top: 5rem;
  border-radius: 20px;
}
</style>
