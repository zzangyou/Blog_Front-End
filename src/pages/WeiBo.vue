<template>
  im查看已发布微博
  <div>
    {{ totalBlogs }}
    <div v-for="b in blogs" :key="b.bid" class="myblog">博客标题：{{ b.title }}。。。。。。</div>
  </div>

  <div class="example-pagination-block">
    <!-- <div class="example-demonstration">When you have few pages</div> -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalBlogs"
      :page-size="5"
      v-model:currentPage="currentPage"
    />
    <!-- current-page	当前页数，支持v-model双向绑定 -->
  </div>
</template>

<script>
import { reactive, toRef, toRefs, getCurrentInstance, onMounted } from 'vue';

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      currentPage: 1, //当前页数
      totalBlogs: 0,
      blogs: [],
    });
    onMounted(() => {
      const userBlogs = proxy.$api.getUserBlogs(localStorage.getItem('currentuser'));
      console.log(userBlogs);
      userBlogs.then(
        (value) => {
          // console.log(value);
          data.totalBlogs = value.data.blogsnumber;
          data.blogs = value.data.data;
        },
        (reason) => {},
      );
    });
    return {
      // 扩展运算符... 可将数组或对象转换成 以逗号分隔的参数序列
      ...toRefs(data),
    };
  },
};
</script>

<style scoped>
.myblog {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>