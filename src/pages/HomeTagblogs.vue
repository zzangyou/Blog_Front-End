<template>
  imHomeTagblogs
  <!-- <div v-for="(b, index) in blogsArr" :key="index" class="tag">
    <h2>{{ b.title }}</h2>
    <p>{{ b.content }}</p>
  </div> -->
  <BlogCard :blogList="blogsArr" @getlike="getlike" @cancellike="cancellike" @deleteblog="deleteblog"></BlogCard>
  <!-- @getcomment="getcomment" -->
  {{ props.tagname }}
</template>

<script>
import { getCurrentInstance, toRef, ref, reactive, onMounted, watch, provide, toRefs } from 'vue';
import { useRoute } from 'vue-router';
export default {
  //组件的props配置接收，这个tagname是路由的props配置设置传来的
  props: ['tagname'],
  /* 关于setup 组件中所用到的：数据、方法等等，均要配置在setup中
  setup函数的参数 1.props 值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性 */
  setup(props) {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      blogsArr: [],
      commentList: [],
    });
    const route = useRoute(); //返回一个包含路由参数等信息的Proxy对象
    // console.log('the route is', route);
    /* route.params. 可获取params参数，route.query. 可获得query参数 */
    onMounted(() => {
      blogsbyTagname(props.tagname); /* 1.页面挂载时执行一次 */
    });

    // ⭐用watch解决 跳转的路由相同但参数不同时，页面数据不自动刷新的问题
    watch(
      /* 2.【监听】路由的params参数tagname */
      () => route.params.tagname, // 监听所返回Proxy对象所返回的具体属性写法(作函数返回值)
      // 所监听数据发生变化时的回调
      (newValue, oldValue) => {
        // console.log('tagname newvalue', newValue, 'tagname oldValue', oldValue);
        blogsbyTagname(newValue); //传入变化后的值
      },
    );
    // 封装发送请求
    const blogsbyTagname = (value) => {
      console.log('传入的标签是', value);
      // 发送请求，传入 传来的标签名，根据标签获取微博
      const blogs = proxy.$api.getBlogsbyTagname({ tagname: value });
      console.log(blogs);
      blogs.then(
        (value) => {
          console.log('HomeTagblogs', value.data.data);
          data.blogsArr = value.data.data;
        },
        (reason) => {
          console.log('HomeTagblogs发生错误');
        },
      );
    };
    // 🔺provide
    /* let { commentList } = toRefs(data);
    provide('commentList', commentList);
    // 组件自定义事件的回调 获取评论内容
    const getcomment = (bid) => {
      console.log(bid);
      const config = {
        bid: bid,
      };
      proxy.$api.getAllComment(config).then((res) => {
        console.log('获取当下微博所有评论', res);
        const newres = reactive(res.data.data);
        data.commentList = newres;
        console.log(data.commentList);
      });
    };

    // 发布一级评论函数封装
    const addcomment = (config) => {
      proxy.$api.addcomment(config).then((res) => {
        console.log(res);
        // 孙组件发生变化 重新获取评论
        proxy.getcomment(config.bid);
        const { code } = res.data;
        if (code == 100000) {
          ElMessage({ message: '发布成功', type: 'success' });
          console.log(res.data);
        }
      });
    };
    provide('addcomment', addcomment); //提供该函数

    // 发布二级评论
    const addchildrencomment = (config) => {
      proxy.$api.addchildrencomment(config).then((res) => {
        console.log(res);
        // 孙组件发生变化 重新获取评论
        proxy.getcomment(config.bid);
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
        proxy.getcomment(config.bid);
        const { code } = res.data;
        if (code == 100000) {
          ElMessage({ message: '删除成功', type: 'success' });
        }
      });
    }; 
    provide('deletecomment', deletecomment);*/

    // 点赞
    const getlike = (obj) => {
      const config = {
        bid: obj.bid,
      };
      proxy.$api.getlike(config).then((res) => {
        console.log('点赞了');
        // const index = obj.index;
        data.blogsArr[obj.index].like++;
      });
    };
    // 取消点赞
    const cancellike = (obj) => {
      const config = {
        bid: obj.bid,
      };
      proxy.$api.cancellike(config).then((res) => {
        console.log('取消点赞了');
        data.blogsArr[obj.index].like--;
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

    return {
      blogsArr: toRef(data, 'blogsArr'),
      props, //
      // getcomment,
      getlike,
      cancellike,
      deleteblog,
    };
  },
};
</script>

<style scoped>
.tag {
  margin: 20px 0;
  padding: 10px 0;
  background-color: #fff;
}
</style>