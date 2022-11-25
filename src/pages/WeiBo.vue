<template>
  im查看已发布微博
  <div class="showmyweibo">
    <div style="background-color: #fff">
      {{ totalnumber }}
      <div v-for="b in blogs" :key="b.bid" class="myblog">博客标题：{{ b.title }}。。。。。。</div>
    </div>

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
</template>

<script>
import { reactive, toRef, toRefs, getCurrentInstance, onMounted } from 'vue';

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      currentPage: 1, //当前页数
      totalnumber: 0, //数据总条数
      pageSize: 5, //一页显示多少条
      allBlogs: [], //未经过滤的所有数据
      blogs: [], //用于放经过过滤处理的数据
    });
    // 将数组过滤处理进行封装
    const setBlogs = () => {
      /* filter() 不改变原数组，不检测空数组。
      它将指定数组中符合条件的所有元素以新数组的形式返回 */
      data.blogs = data.allBlogs.filter((item, index) => {
        //当前元素,当前元素索引值
        return index < data.pageSize;
      });
    };
    onMounted(() => {
      const userBlogs = proxy.$api.getUserBlogs(localStorage.getItem('currentuser'));
      console.log('userBlogs', userBlogs);
      userBlogs.then(
        (value) => {
          // console.log(value);
          data.totalnumber = value.data.blogsnumber;
          data.allBlogs = value.data.data;
          setBlogs();
        },
        (reason) => {},
      );
    });
    // 当前页数改变时的回调
    const handleCurrentChange = (page) => {
      console.log(page); //该内置参数能拿到当前所在页
      // 获取当前页数据的起始下标
      let start = data.pageSize * (page - 1);
      // 获取当前页数据的末尾下标
      let end = data.pageSize * page;
      let tempBlogs = [];
      // 渲染当前页数据
      for (let i = start; i < end; i++) {
        if (data.allBlogs[i]) {
          tempBlogs.push(data.allBlogs[i]); //push()向数组追加一个元素
        }
        data.blogs = tempBlogs;
      }
    };
    // 每页显示数据条数(page-size)改变时的回调
    const handleSizeChange = (size) => {
      console.log(size);
      data.currentPage = 1;
      data.pageSize = size;
      setBlogs();
    };
    return {
      // 扩展运算符... 可将数组或对象转换成 以逗号分隔的参数序列
      ...toRefs(data),
      handleCurrentChange,
      handleSizeChange,
    };
  },
};
</script>

<style scoped lang="scss">
/* .showmyweibo {

} */
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