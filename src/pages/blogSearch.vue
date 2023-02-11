<template>
  i am blogSearch
  <!-- 使用组件 -->
  <BlogCard :blogList="data.blogs"></BlogCard>
  <p v-show="isShow">没有博客与该标题相关噢~</p>
</template>
<script>
import { computed, getCurrentInstance, onMounted, reactive, watch } from 'vue';
import BlogCard from '@/components/blogCard.vue'; //引入组件
import { useRoute } from 'vue-router';
export default {
  components: {
    //注册组件
    BlogCard,
  },
  // 声明接收props
  props: ['keyword'],
  setup(props) {
    const { proxy } = getCurrentInstance();
    const route = useRoute(); //返回一个包含路由参数等信息的Proxy对象
    console.log(props);
    let data = reactive({
      blogs: [],
      code: 100000,
    });
    // 计算属性 计算属性由已有的属性计算而成
    let isShow = computed(
      // 简写
      () => {
        if (data.code == 100000) {
          return false;
        } else {
          return true;
        }
      },
    );
    onMounted(() => {
      sendSearch(props.keyword);
    });
    /* 🚩监听props所接收参数 路由跳转时路径不变参数变但页面不刷新的问题 */
    watch(
      () => route.params.keyword, //监听props所接收参数
      (newValue) => {
        //变化时发请求
        sendSearch(newValue);
      },
    );
    function sendSearch(value) {
      // 发请求 根据所传来关键字获取有对应标题的博客
      const result = proxy.$api.getSearchBlog({ keyword: value });
      console.log('result', result);
      result.then(
        (value) => {
          data.blogs = value.data.data;
          if (value.data.code == 100001) {
            data.code = 100001;
          } else {
            data.code = 100000;
          }
        },
        (reponse) => {
          console.log('blogSearch发生错误');
        },
      );
    }
    return {
      BlogCard,
      data,
      isShow,
    };
  },
};
</script>