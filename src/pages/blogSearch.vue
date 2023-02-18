<template>
  i am blogSearch
  <!-- 使用组件 -->
  <BlogCard :blogList="data.blogs" @getlike="getlike" @cancellike="cancellike" @deleteblog="deleteblog"></BlogCard>
  <p v-show="isShow">没有博客与该标题相关噢~</p>
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
      currentPage: 1, //当前页数
      totalnumber: 0, //数据总条数
      pageSize: 5, //一页显示多少条
      allBlogs: [], //未经过滤的所有数据
      blogs: [], //用于放经过过滤处理的数据

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
          data.allBlogs = value.data.data;
          data.totalnumber = value.data.data.length;
          data.allBlogs = value.data.data;
          setBlogs();
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
    // 将数组过滤处理进行封装
    const setBlogs = () => {
      /* filter() 不改变原数组，不检测空数组。
      它将指定数组中符合条件的所有元素以新数组的形式返回 */
      data.blogs = data.allBlogs.filter((item, index) => {
        //当前元素,当前元素索引值
        return index < data.pageSize;
      });
    };
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
    return {
      BlogCard,
      data,
      isShow,
    };
  },
};
</script>