<template>
  <!-- <div>im homeaside</div> -->
  <div class="homeaside">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item
            v-for="(tname, index) in tagnamesArr"
            :key="index"
            :index="index"
            @click="changeToHomeTagblogs(tname)"
          >
            <span>{{ tname }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCurrentInstance, ref, onMounted, reactive, toRefs } from 'vue';
import { router } from '@/router/index';
import HomeTagBlogs from './HomeTagblogs.vue';
export default {
  setup(props) {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      tagnamesArr: [], //标签名数组
    });
    onMounted(() => {
      const tagnames = proxy.$api.getTagnames();
      console.log(tagnames);
      tagnames.then(
        (value) => {
          console.log(value.data.data);
          data.tagnamesArr = value.data.data;
        },
        (reason) => {},
      );
    });
    const changeToHomeTagblogs = (tname) => {
      router.push({
        //replace模式切换路由
        name: 'toHometagblogs',
        params: {
          tagname: tname,
        },
      });
    };
    const handleOpen = (key, keyPath) => {
      // console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      // console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
      // 扩展运算符可将数组或对象转换成以逗号分隔的参数序列
      ...toRefs(data), //toRefs
      changeToHomeTagblogs,
    };
  },
};
</script>
<style lang="scss">
.head:hover {
  cursor: pointer;
}

/* 设置该侧边导航宽度等，需要用控制台才能找到该元素来更改 */
.el-col-12 {
  max-width: 100%;
  flex: 0 0 100%;
  box-sizing: border-box;
}

.homeaside {
  height: 550px;
  text-align: center;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
