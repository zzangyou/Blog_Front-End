<template>
  <div class="useraside">
    <!-- im useraside -->
    <!-- 头像昵称 -->
    <div style="margin-top: 3rem">
      <!-- action 请求url -->
      <!-- 上传头像这块有一个mock拦截问题，可能需要后端接口完成后才能配合解决完善 -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8000/public/user/avatar"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <!-- on-success	文件上传成功时的钩子。
            before-upload	上传文件之前的钩子，参数为上传的文件，
            若返回false或者返回 Promise 且被 reject，则停止上传。 -->
        <el-avatar title="点击更换头像" class="head" v-if="imageUrl" :src="imageUrl" />
      </el-upload>
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
import { getCurrentInstance, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import UploadProps from 'element-plus';
const proxy = getCurrentInstance();
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
const imageUrl = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
/* onMounted(() => {
  proxy.$api.sendAvatar('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
}); */
// 文件上传成功时
const handleAvatarSuccess = (response, uploadFile) => {
  if (typeof uploadFile.raw != 'undefined' && uploadFile.raw != 'null') {
    imageUrl.value = URL.createObjectURL(uploadFile.raw);
    console.log(imageUrl.value);
    console.log(uploadFile.raw);
  }
};

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
  height: 35rem;
  text-align: center;
}
</style>
