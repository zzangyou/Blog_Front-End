<template>
  <div class="home-container">
    <el-form ref="ruleFormRef" :model="ruleForm">
      <el-form-item class="title">
        <el-input placeholder=" 请输入标题" v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 0">
        <!-- 文本编辑器 -->
        <div class="editor-container">
          <w-editor
            @ShowTag="changeShowTag"
            @updatevalue="getText"
            @showPicture="changeShowPicture"
            :resetText="isresetText"
          ></w-editor>
          <div class="btn-container">
            <el-button type="" @click="submitForm(formRef)" class="btn"> 发送</el-button>
          </div>
          <!-- 标签件 -->
          <div class="tag-container" v-show="isShowTag">
            <el-tag
              v-for="(tag, index) in ruleForm.tagname"
              :key="tag"
              :type="types[index]"
              class="mx-1 tags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="inputVisible"
              ref="InputRef"
              v-model="inputValue"
              class="ml-1 w-20"
              style="width: 6rem"
              size="small"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput" round>
              + 增加新标签
            </el-button>
          </div>
        </div>
      </el-form-item>
      <!-- 图片上传 -->
      <el-form-item v-show="isShowUpload" class="upload-container" style="justify-content: flex-start">
        <el-upload
          v-model:file-list="fileList"
          ref="upload"
          name="blogpicture"
          :action="uploadUrl"
          list-type="picture-card"
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceedCover"
          :on-success="handleSuccess"
          :auto-upload="false"
          :data="ruleForm"
          limit="9"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
    </el-form>
    <!-- 轮播图 -->
    <div class="carousel-container">
      <Carousel></Carousel>
    </div>
    <!-- 微博显示页 -->
    <div class="blog-container">
      <BlogCard
        :blogList="blogList"
        @getlike="getlike"
        @cancellike="cancellike"
        @deleteblog="deleteblog"
        @getcomment="getcomment"
      ></BlogCard>
    </div>
  </div>
</template>
<script>
import WEditor from '../components/blogEditor.vue';
import Carousel from '../components/HomeCarousel.vue';
import { defineComponent, provide, nextTick, ref, reactive, toRefs } from 'vue';
import { getCurrentInstance, onBeforeMount, onMounted, watch } from '@vue/runtime-core';
import BlogCard from '../components/blogCard.vue';
import config from '../config';
import { useStore } from '@/models/index';
export default defineComponent({
  components: {
    WEditor,
    Carousel,
    BlogCard,
  },
  setup() {
    const storePublic = useStore('publicInfo');
    const { proxy } = getCurrentInstance();
    const inputValue = ref('');
    const types = reactive([
      '',
      'danger',
      'warning',
      'info',
      '',
      'danger',
      'warning',
      'info',
      '',
      'danger',
      'warning',
      'info',
    ]);
    const inputVisible = ref(false);
    const InputRef = ref('');
    //  是否清空富文本编辑器
    const isresetText = ref(false);
    //  获取当前账号
    const useraccount = storePublic.getUseraccount();
    const ruleForm = reactive({
      title: '',
      tagname: ['日常', '心情', '其他'],
      content: '',
      //  👀后期修改获取账号
      useraccount: useraccount,
    });
    //  关闭标签
    const handleClose = (tag) => {
      proxy.ruleForm.tagname.splice(proxy.ruleForm.tagname.indexOf(tag), 1);
    };
    //  显示输入框
    const showInput = () => {
      inputVisible.value = true;
      nextTick(() => {
        InputRef.value.input.focus();
      });
    };
    const handleInputConfirm = () => {
      if (inputValue.value) {
        proxy.ruleForm.tagname.push(inputValue.value);
      }
      inputVisible.value = false;
      inputValue.value = '';
    };
    //  标签组件显示
    let isShowTag = ref(false);
    const changeShowTag = (val) => {
      proxy.isShowTag = val;
    };
    //  获取编辑器文本
    const getText = (text) => {
      console.log(text);

      proxy.ruleForm.content = text;
    };
    const submitForm = () => {
      console.log(fileList.value.length);
      // 若有上传图片
      if (fileList.value.length !== 0) {
        // 提交表单实际上是上传图片，表单数据做附带参数
        proxy.$refs.upload.submit();
        ElMessage({ message: '发送成功', type: 'success' });
        // 发布成功后重新获取bloglist
        proxy.getBlogData();
      } else {
        proxy.$api.addPost(ruleForm).then((res) => {
          console.log(res);
          if (res.data.code === 100000) {
            proxy.ruleForm.title = '';
            proxy.ruleForm.content = '';
            proxy.isShowTag = false;
            proxy.isresetText = true;
            ElMessage({ message: '发送成功', type: 'success' });
            // 发布成功后重新获取bloglist
            proxy.getBlogData();
          } else {
            ElMessage({ message: '发送失败，请稍后再试', type: 'warning' });
          }
        });
      }
    };
    /* 图片上传模块 */
    // 图片上传显示
    let isShowUpload = ref(false);
    const changeShowPicture = (val) => {
      proxy.isShowUpload = val;
    };
    const fileList = ref([]);

    const dialogImageUrl = ref('');
    const dialogVisible = ref(false);
    const uploadUrl = ref(config.baseApi + '/blog/addPost');

    //上传前钩子
    const beforeUpload = (file) => {
      return true;
    };

    // 移除文件
    const handleRemove = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles);
    };
    // 预览图片
    const handlePictureCardPreview = (uploadFile) => {
      if (uploadFile.url) {
        dialogImageUrl.value = uploadFile.url;
      }
      dialogVisible.value = true;
    };
    // 上传成果
    const handleSuccess = (res) => {
      console.log(res);
    };
    // 图片上传超出限制
    const handleExceedCover = (files, fileList) => {
      ElMessage.error({
        message: '上传图片数量超出限制！',
        type: 'error',
      });
    };
    //分页数据 （👀后期修改）
    const pageNumber = 1;
    const pageSize = 20;
    //页面初始化 获取微博数据
    const data = reactive({
      blogList: [],
      commentList: [],
    });
    // 获取微博数据
    const getBlogData = () => {
      proxy.$api.getAllBlog(pageNumber, pageSize).then((res) => {
        console.log(res);
        const newres = reactive(res.data.data);
        data.blogList = newres;
      });
    };
    // 组件一挂载就获取微博
    onMounted(() => {
      proxy.getBlogData();
    });
    // 点赞
    const getlike = (obj) => {
      const config = {
        bid: obj.bid,
      };
      proxy.$api.getlike(config).then((res) => {
        console.log('点赞了');
        const index = obj.index;
        console.log(data.blogList);
        data.blogList[index].like++;
      });
    };
    // 取消点赞
    const cancellike = (obj) => {
      const config = {
        bid: obj.bid,
      };
      proxy.$api.cancellike(config).then((res) => {
        const index = obj.index;
        data.blogList[index].like--;
      });
    };
    // 删除微博
    const deleteblog = (bid) => {
      const useraccount = storePublic.getUseraccount();
      const config = {
        useraccount,
        bid,
      };
      proxy.$api.deleteblog(config).then((res) => {
        console.log(res);
        proxy.getBlogData();
        const { code } = res.data;
        if (code == 100000) {
          ElMessage({ message: '删除成功', type: 'success' });
        }
      });
    };

    // 💬 评论模块
    let { commentList } = toRefs(data);
    // 获取评论内容
    provide('commentList', commentList);
    const getcomment = (bid) => {
      proxy.$api.getAllComment(bid).then((res) => {
        const newres = reactive(res.data.data);
        /*     newres.forEach(item=>{
    proxy.$api.getChildrenComment(item.cid).then(
    res=>{
      console.log(res);
      const newres=reactive(res.data.data)
      item['childList']=newres
    }
  ) 
    }) */
        nextTick(() => {
          data.commentList = newres;
        });
        console.log(data.commentList);
      });
    };
    // 发布一级评论
    const addcomment = (config) => {
      proxy.$api.addcomment(config).then((res) => {
        console.log(res);
        const { code } = res.data;
        if (code == 100000) {
          ElMessage({ message: '发布成功', type: 'success' });
        }
      });
      // 孙组件发生变化 重新获取评论
      proxy.getcomment(config.bid);
    };
    provide('addcomment', addcomment);
    // 发布二级评论
    const addchildrencomment = (config) => {
      proxy.$api.addchildrencomment(config).then((res) => {});
    };

    // 删除评论
    const deletecomment = (config) => {
      proxy.$api.deletecomment(config).then((res) => {
        console.log(res);
        const { code } = res.data;
        if (code == 100000) {
          ElMessage({ message: '删除成功', type: 'success' });
        }
      });
      // 孙组件发生变化 重新获取评论
      proxy.getcomment(config.bid);
    };
    provide('deletecomment', deletecomment);
    return {
      inputValue,
      inputVisible,
      InputRef,
      handleClose,
      showInput,
      handleInputConfirm,
      isShowTag,
      isresetText,
      changeShowTag,
      types,
      getText,
      ruleForm,
      fileList,
      dialogImageUrl,
      dialogVisible,
      handleRemove,
      handlePictureCardPreview,
      submitForm,
      isShowUpload,
      changeShowPicture,
      handleExceedCover,
      uploadUrl,
      beforeUpload,
      handleSuccess,
      ...toRefs(data),
      getBlogData,
      pageNumber,
      pageSize,
      getlike,
      cancellike,
      deleteblog,
      getcomment,
      deletecomment,
    };
  },
});
</script>
<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: -0.2rem;
    border-bottom: 1px solid rgba($color: #cfcaca, $alpha: 1);
    :deep .el-input__wrapper.is-focus {
      box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    }
  }
  .editor-container {
    flex: 1;
    // height: 5rem;
  }

  .btn-container {
    position: absolute;
    width: 4rem;
    bottom: 0;
    right: 0.5rem;
    margin-bottom: 0.3rem;
  }
  /*   

:deep .el-form-item__content{
    justify-content: flex-end;
  } */
}
.tag-container {
  position: absolute;
  top: 6.5rem;
  height: 1.5rem;
  flex-wrap: wrap-reverse;
  display: flex;
  justify-content: flex-end;
  .tags {
    display: flex;
  }
}
:deep .w-e-bar {
  padding: 0 1rem;
}
:deep .el-upload-list--picture-card {
  --el-upload-list-picture-card-size: 8rem;
}
:deep .el-upload--picture-card {
  --el-upload-picture-card-size: 8rem;
}
:deep .el-dialog {
  --el-dialog-width: 60%;
}
.blog-container {
  margin: 1.5rem 0;
}
</style>
