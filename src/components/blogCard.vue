<template>
  <div class="css-1qw96cp">
    <el-card shadow="hover" v-for="(item, index) in blogList" :key="item.bid">
      <section class="jss177">
        <div class="jss178 css-faujvq">
          <div class="css-1p83tvv">
            <div class="css-3i9vrz">
              <el-avatar :src="changeToUrl(item.avatar)" alt=""  />
            </div>
          </div>
          <div class="userinfo">
            <span class="css-14tqbo1">{{ item.username }}</span>
            <span class="css-rf2lqt">{{ item.publishtime }}</span>
          </div>
        </div>
      </section>
      <div class="text-box">
        <h2 class="jss180 css-t1nuxs">{{ item.title }}</h2>
        <!-- 后期修改：将json字符串转为模板字符串插入html -->
        <div class="css-1tqv6h6">
          <div v-html="item.content"></div>
        </div>
        <el-row style="width: 100%" justify="center">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="imgcontainer flex">
              <div class="imgbox">
                <el-image
                  v-for="(image, index) in item.blogpicture"
                  :key="index"
                  :style="item.blogpicture.length == 1 ? 'width:100%;max-width:200px' : 'width:30%'"
                  :src="changeToUrl(image)"
                  :initial-index="4"
                  fit="cover"
                />
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="jss273">
          <section class="tag-container">
            <el-button v-for="(tag, index) in item.tagname" :key="index" :color="tagcolor[index]">
              {{ tag }}
            </el-button>
          </section>
        </div>
      </div>
      <section class="jss275">
        <div class="jss276">
          <el-button @click="changelike(item.bid, index)" class="likebtn" circle text
            ><i class="iconfont icon-dianzan"></i>
            <span class="css-1u6z2n7">{{ item.like }}</span>
          </el-button>
          <el-button circle text @click="changeShowComment(item.bid, index)"
            ><el-icon size="1.5rem"><ChatLineSquare /></el-icon
          ></el-button>
          <el-button v-show="isShowDelete(item.username)" @click="deleteBlog(item.bid)" circle text
            ><el-icon size="1.5rem"><Delete /></el-icon
          ></el-button>
        </div>
      </section>
      <!-- 评论模块 -->
      <div v-show="index == i && isShowComment">
        <BlogComment :bid="item.bid"></BlogComment>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  defineComponent,
  reactive,
  watchEffect,
  toRefs,
  ref,
  getCurrentInstance,
  onUpdated,
  nextTick,
  provide,
} from 'vue';
import { useStore } from '@/models/index';
import BlogComment from '../components/blogComment.vue';
export default defineComponent({
  components: {
    BlogComment,
  },
  // 父组件需要传递的参数
  props: {
    blogList: {
      type: Array,
    },
  },
  setup(props, context) {
    // 传入需要获取的pinia数据的模块
    const storePublic = useStore('publicInfo');
    const { proxy } = getCurrentInstance();
    //  解决父传子的prop值不是响应式
    const state = reactive({
      blogList: '',
    });
    onUpdated(() => {
      isShowComment.value = false;
    });
    // 标签颜色
    const tagcolor = ['#3F51B5', '#ead0d1', '#b5c4b1', '#faead3', '#c9c0d3', '#8696a7'];
    watchEffect(() => {
      state.blogList = props.blogList;
      console.log('blogList变化了');
    });
    /*     watchEffect(() => {
      state.success = props.success;
      isShowComment.value=!isShowComment.value
    }) */
    //  判断博客发布者与当前登录用户是否为同一人
    //  是的话显示 不是的话隐藏
    const isShowDelete = (blogUsername) => {
      const currentUsername = storePublic.getUsername();
      if (currentUsername == blogUsername) {
        return true;
      } else {
        return false;
      }
    };
    //删除当前微博
    const deleteBlog = (bid) => {
      context.emit('deleteblog', bid);
    };
    //判断当前是否处于点赞状态
    let islike = ref(false);
    let currentbid = ref(0);
    //  点赞or取消点赞微博
    const changelike = (bid, index) => {
      const obj = {
        bid,
        index,
      };
      if (islike.value === false) {
        console.log(bid, index);
        context.emit('getlike', obj);
        currentbid.value = bid;
        islike.value = true;
      } else if (islike.value === true && currentbid.value !== bid) {
        context.emit('getlike', obj);
        currentbid.value = bid;
      } else {
        context.emit('cancellike', obj);
        currentbid.value = bid;
        islike.value = false;
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
    // ❗ 后期修复闪屏现象
    /* ✔ 已修复 bug：由于js单线程 导致异步任务会延时进行（所以导致先showcomment再渲染评论数据
       👌解决方案：将comment的请求改入到blogcard组件中 使用then 等待异步请求完成后再显示评论组件（注：以后尽量还是少使用跨级组件传值）
    */
    // 用于判断显示评论的index值
    let i = ref(-1);
    // 是否显示评论组件
    let isShowComment = ref(false);
    const changeShowComment = (bid, index) => {
      proxy.i = index;
      // 此时还需触发父级事件获取评论内容
      getcomment(bid);
    };
    // 💬 评论模块
    const data = reactive({
      //  blogList:[],
      commentList: [],
    });
    let { commentList } = toRefs(data);
    // 获取评论内容
    provide('commentList', commentList);
    const getcomment = (bid) => {
      console.log(bid);
      const config = {
        bid: bid,
      };
      proxy.$api.getAllComment(config).then((res) => {
        console.log(res);
        const newres = reactive(res.data.data);
        data.commentList = newres;
        isShowComment.value = !isShowComment.value;
      });
    };
    // 发布一级评论
    const addcomment = (config) => {
      proxy.$api.addcomment(config).then((res) => {
        console.log(res);
        // 孙组件发生变化 重新获取评论
        getcomment(config.bid);
        const { code } = res.data;
        if (code == 100000) {
          ElMessage({ message: '发布成功', type: 'success' });
          console.log(res.data);
        }
      });
    };
    // 传递给孙组件addcommen方法
    provide('addcomment', addcomment);
    // 发布二级评论
    const addchildrencomment = (config) => {
      proxy.$api.addchildrencomment(config).then((res) => {
        console.log(res);
        // 孙组件发生变化 重新获取评论
        getcomment(config.bid);
        const { code } = res.data;
        if (code == 100000) {
          ElMessage({ message: '发布成功', type: 'success' });
        }
      });
    };
    provide('addchildrencomment', addchildrencomment);
    // 删除评论
    const deletecomment = (config) => {
      proxy.$api.deletecomment(config).then((res) => {
        console.log(res);
        // 孙组件发生变化 重新获取评论
        getcomment(config.bid);
        const { code } = res.data;
        if (code == 100000) {
          ElMessage({ message: '删除成功', type: 'success' });
        }
      });
    };
    provide('deletecomment', deletecomment);
    return {
      i,
      deleteBlog,
      isShowDelete,
      isShowComment,
      tagcolor,
      ...toRefs(state),
      changelike,
      changeShowComment,
      changeToUrl,
    };
  },
});
</script>
<style lang="scss" scoped>
@import 'http://at.alicdn.com/t/c/font_3274443_xjbb5lzlw7n.css';
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 1.55rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.userinfo {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.text-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.3rem;
}
.time {
  font-size: 0.8rem;
}
.publishtime {
  margin: 0.3rem 0;
}
.imgcontainer {
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem 0;
  .imgbox {
    height: 100%;
  }
  /*   .blogimg {
    width: 25.33%;
    height: 5rem;
    margin: 0.2rem;
    border-radius: 0.5rem;
  } */
  /*   ::v-deep .el-image{
        width: 30%;
  } */
}
:deep .el-card {
  margin-bottom: 2rem;
}
:deep .el-card:hover {
  background-color: rgba(254, 251, 251, 0.984);
}
:deep .likebtn {
  position: relative;
  margin-right: 0.5rem;
}
.tag-container {
  display: flex;
}
</style>
