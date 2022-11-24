<template>
  imHomeTagblogs
  <div v-for="(b, index) in blogsArr" :key="index" class="tag">
    <h2>{{ b.title }}</h2>
    <p>{{ b.content }}</p>
  </div>
  {{ props.tagname }}
</template>

<script>
import { getCurrentInstance, toRef, ref, reactive, onMounted, watch } from 'vue';
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
    });
    const route = useRoute(); //返回一个包含路由参数等信息的Proxy对象
    console.log('the route is', route);
    /* route.params. 可获取params参数，route.query. 可获得query参数 */
    onMounted(() => {
      blogsbyTagname(props.tagname); /* 1.页面挂载时执行一次 */
    });

    // ⭐用watch解决 跳转的路由相同但参数不同时，页面数据不自动刷新的问题
    watch(
      /* 2.【监听】路由的params参数tagname */
      () => route.params.tagname, // 监听proxy对象所返回的具体属性写法(作函数返回值)
      // 所监听数据发生变化时的回调
      (newValue, oldValue) => {
        // console.log('tagname newvalue', newValue, 'tagname oldValue', oldValue);
        blogsbyTagname(newValue); //传入变化后的值
      },
    );
    // 封装发送请求
    const blogsbyTagname = (value) => {
      // 发送请求，传入 传来的标签名，根据标签获取微博
      const blogs = proxy.$api.getBlogsbyTagname(value);
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
    return {
      blogsArr: toRef(data, 'blogsArr'),
      props, //
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