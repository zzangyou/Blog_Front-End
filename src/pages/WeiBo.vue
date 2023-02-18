<template>
  im查看已发布微博
  <div class="showmyweibo">
    <div>
      <!-- {{ totalnumber }}
      <div v-for="b in blogs" :key="b.bid" class="myblog">博客标题：{{ b.title }}。。。。。。</div> -->
      <BlogCard :blogList="blogs" @getlike="getlike" @cancellike="cancellike" @deleteblog="deleteblog"></BlogCard>
      <!-- @getcomment="getcomment" -->
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
import { reactive, toRef, toRefs, getCurrentInstance, onMounted, provide } from 'vue';
import BlogCard from '@/components/blogCard.vue';

export default {
  components: {
    BlogCard,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      currentPage: 1, //当前页数
      totalnumber: 0, //数据总条数
      pageSize: 5, //一页显示多少条
      allBlogs: [], //未经过滤的所有数据
      blogs: [], //用于放经过过滤处理的数据
      commentList: [],
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
      const userBlogs = proxy.$api.getUserBlogs({ useraccount: localStorage.getItem('currentuser') });
      console.log('查看已发布微博', userBlogs);
      userBlogs.then(
        (value) => {
          // console.log(value);
          data.totalnumber = value.data.data.length;
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
      }
      data.blogs = tempBlogs;

      // 回到顶部
      document.documentElement.scrollTop = 0;
    };
    // 每页显示数据条数(page-size)改变时的回调
    const handleSizeChange = (size) => {
      console.log(size);
      data.currentPage = 1;
      data.pageSize = size;
      setBlogs();
    };

    // 微博模块
    // 点赞
    const getlike = (obj) => {
      const config = {
        bid: obj.bid,
      };
      proxy.$api.getlike(config).then((res) => {
        console.log('点赞了');
        data.blogs[obj.index].like++;
      });
    };
    // 取消点赞
    const cancellike = (obj) => {
      const config = {
        bid: obj.bid,
      };
      proxy.$api.cancellike(config).then((res) => {
        console.log('取消点赞了');
        data.blogs[obj.index].like--;
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
    // 评论模块
    // 🔺provide 是父级组件需要注入的依赖(即需要提供的数据)
    // let commentList = toRef(data, 'commentList');
    // 或 let {commentList} = toRefs(data);
    /*
    -toRef()用于创建一个对应的 ref。
      这样创建的ref会与其源属性【保持同步】：改变源属性的值将更新ref的值，反之亦然。
    -而toRefs()将一个响应式对象转换为一个普通对象，
      这个普通对象的 每个属性 都是指向源对象相应属性的 ref。
      这每个单独的 ref 都是使用 toRef() 创建的。
    */
    // provide('commentList', commentList);
    /* 🔺provide传过去的值一定要是proxy直接进行过代理的或者计算属性才能有响应式！！
    如果这data.commentList这样传给子组件将不是响应式（因为data.listData不是proxy类型）*/
    /*所以使用toRef就不会失去响应性 */
    /* 
    // 自定义事件的回调 获取评论内容
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
    provide('deletecomment', deletecomment); */

    return {
      // 扩展运算符... 可将数组或对象转换成 以逗号分隔的参数序列
      ...toRefs(data),
      handleCurrentChange,
      handleSizeChange,
      BlogCard,
      getlike,
      cancellike,
      deleteblog,
      // getcomment,
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
