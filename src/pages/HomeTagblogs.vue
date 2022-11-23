<template>
  imHomeTagblogs
  <div v-for="(b, index) in blogsArr" :key="index" class="tag">
    <h2>{{ b.title }}</h2>
    <p>{{ b.content }}</p>
  </div>
</template>

<script>
import { getCurrentInstance, toRef, ref, reactive, onMounted } from 'vue';
export default {
  //【组件的】props配置，用于接收参数
  props: ['tagname'], //接收传来的标签名
  /* 关于setup 组件中所用到的：数据、方法等等，均要配置在setup中
  setup函数的参数 1.props 值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性 */
  setup(props) {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      blogsArr: [],
    });
    console.log(props); //Proxy {tagname: '美食'}

    onMounted(() => {
      // 发送请求，传入 传来的标签名，根据标签获取微博
      const blogs = proxy.$api.getBlogsbyTagname(ref(props.tagname));
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
    });

    return {
      blogsArr: toRef(data, 'blogsArr'),
    };
  },
};
</script>

<style scoped>
.tag {
  margin: 20px 0;
  background-color: #fff;
}
</style>