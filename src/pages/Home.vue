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
          class="upload-demo"
          v-model:file-list="fileList"
          ref="upload"
          name="blogpicture"
          action="uploadUrl"
          list-type="picture-card"
          :http-request="submitForm"
          :before-upload="beforeUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-exceed="handleExceedCover"
          :on-success="handleSuccess"
          :on-change="changeHandler"
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
     <div>
        <BlogCard
        :blogList="blogs"
        @getlike="getlike"
        @cancellike="cancellike"
        @deleteblog="deleteblog"
        @getcomment="getcomment"
      ></BlogCard>
     </div>
      <!-- 分页查询模块 -->
          <div class="example-pagination-block">
      <!-- <div class="example-demonstration">When you have few pages</div> -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalnumber"
        v-model:currentPage="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        hide-on-single-page="false"
      />
      <!-- 
        current-page	当前页数，支持v-model双向绑定 
        page-size：一页显示多少条
        page-sizes:	每页显示个数的选项  (可有可无)
        @current-change:当前页发生改变时触发
        @size-change: 每页显示数据条数(page-size)改变时触发
      -->
    </div>
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
    var fileArray = [];
    var fileTTT = [];
    const uploadUrl = config.baseApi + 'blog/addPost';
    const changeHandler = (file, fileList) => {
      //on-change绑定的方法
      console.log('点了');
      console.log(file);
      fileArray.push(file);
      // console.log(fileArray)
      fileTTT = fileList.Target;
      console.log('重新赋值的fileTTT');
      console.log(fileTTT);
    };
    const inputVisible = ref(false);
    const InputRef = ref('');
    //  是否清空富文本编辑器
    const isresetText = ref(false);
    //  获取当前账号及用户名
    const useraccount = storePublic.getUseraccount();
    const username = storePublic.getUsername();
    const ruleForm = reactive({
      title: '标题',
      tagname: ['日常', 'ootd', '其他'],
      content: '内容',
      //  👀后期修改获取账号
      useraccount: useraccount,
      username:username,
      publishtime: '2022/12/23 20:30',
    });
    //  关闭标签
    const handleClose = (tag) => {
     ruleForm.tagname.splice(proxy.ruleForm.tagname.indexOf(tag), 1);
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
        ruleForm.tagname.push(inputValue.value);
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
      console.log(fileList);
      /* 上传文件的参数在这里编辑 */
      let postContext = new FormData();
      postContext.append('useraccount', ruleForm.useraccount);
      postContext.append('content', ruleForm.content);
      postContext.append('tagname', ruleForm.tagname);
      postContext.append('title', ruleForm.title);
      postContext.append('username',ruleForm.username)
      /* 这里的代码不用管，是管理图片文件上传的 */
      for (var i = 0; i < fileArray.length; i++) {
        postContext.append('blogpicture', fileArray[i].raw);
      }
      console.log(postContext);
      proxy.$api.addPost(postContext).then((res) => {
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
    //上传前钩子
    const beforeUpload = (file) => {
      return true;
    };

    // 移除文件
    const handleRemove = (uploadFile, uploadFiles) => {
      // console.log(uploadFile, uploadFiles);
      console.log(uploadFile.name);
      console.log(uploadFiles);
      fileArray.forEach((item, index) => {
        if (item.name == uploadFile.name) {
          fileArray.splice(index, 1);
        }
      });
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

// 获取微博数据
const getBlogData=()=>{
  const config ={
    pageNumber:1,
    pageSize:5
  }
    proxy.$api.getAllBlog().then(res=>{
    console.log(res);
    // const newres=reactive(res.data.data)
    pageData.totalnumber = res.data.data.length;
    pageData.allBlogs = res.data.data;
    setBlogs();
    // data.blogList=newres
  }
  )
}
// 组件一挂载就获取微博
onMounted(()=>{
 proxy.getBlogData()
}
)
// 点赞
const getlike=(obj)=>{
  const config={
  bid:obj.bid
  }
  proxy.$api.getlike(config).then(
    res=>{
      console.log('点赞了');
      const index=obj.index
      console.log(data.blogList);
      pageData.blogs[index].like++
    }
  )
}
// 取消点赞
const cancellike=(obj)=>{
  const config={
    bid:obj.bid
  }
  proxy.$api.cancellike(config).then(
    res=>{
      const index=obj.index
       pageData.blogs[index].like--
    }
  )
}
// 删除微博
const deleteblog=(bid)=>{
  const useraccount= storePublic.getUseraccount()
  const config={
    useraccount,
    bid
  }
  proxy.$api.deleteblog(config).then(
    res=>{
      console.log(res);
      proxy.getBlogData()
      const { code } = res.data;
      if(code==100000){
        ElMessage({ message: '删除成功', type: 'success' });
      }
    }
  )
}  

// 分页查询
    const pageData = reactive({
      currentPage: 1, //当前页数
      totalnumber: 0, //数据总条数
      pageSize: 2, //一页显示多少条
      allBlogs: [], //未经过滤的所有数据
      blogs: [], //用于放经过过滤处理的数据
    });
        // 将数组过滤处理进行封装
    const setBlogs = () => {
      /* filter() 不改变原数组，不检测空数组。
      它将指定数组中符合条件的所有元素以新数组的形式返回 */
      pageData.blogs = pageData.allBlogs.filter((item, index) => {
        //当前元素,当前元素索引值
        return index < pageData.pageSize;
      });
    };
    // 当前页数改变时的回调
    const handleCurrentChange = (page) => {
      console.log(page); //该内置参数能拿到当前所在页
      // 获取当前页数据的起始下标
      let start = pageData.pageSize * (page - 1);
      // 获取当前页数据的末尾下标
      let end = pageData.pageSize * page;
      let tempBlogs = [];
      // 渲染当前页数据
      for (let i = start; i < end; i++) {
        if (pageData.allBlogs[i]) {
          tempBlogs.push(pageData.allBlogs[i]); //push()向数组追加一个元素
        }
        pageData.blogs = tempBlogs;
      }
    };
    // 每页显示数据条数(page-size)改变时的回调
    const handleSizeChange = (size) => {
      console.log(size);
      pageData.currentPage = 1;
      pageData.pageSize = size;
      setBlogs();
    };

    return {
      fileArray,
      changeHandler,
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
      beforeUpload,
      handleSuccess,
      ...toRefs(data),
      getBlogData,
      getlike,
      cancellike,
      deleteblog,
/*       getcomment,
      deletecomment, */
      ...toRefs(pageData),
      handleCurrentChange,
      handleSizeChange,
      BlogCard,
     }
     
  }
}
) 
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
.myblog {
  margin: 2rem 0;
}
.example-pagination-block {
  display: inline-block;
  margin: auto;
  margin-top: 2rem;
  // background-color: skyblue;
  .example-demonstration {
    margin-bottom: 16px;
  }
}
</style>
