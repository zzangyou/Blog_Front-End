<template>
  <!-- <div>im homeaside</div> -->
  <div class="homeaside">
    <el-row class="tac">
      <el-col :span="12">
        <div class="tag-title flex flex-center">
          <el-icon color="#3F51B5" style="margin-right: 4px">
            <PriceTag />
          </el-icon>
          标签推荐
        </div>

        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item
            v-for="(tname, index) in tagnamesArr.slice(0, 12)"
            class="menu-item"
            :key="index"
            :index="index"
            @click="changeToHomeTagblogs(tname)"
          >
            <span class="tag-icon" :style="{ background: tagColor[index] }"></span>
            <span>{{ tname }}</span>
          </el-menu-item>

          <el-menu-item @click="dialogVisible = true">
            <li class="tag-title">查看更多...</li>
          </el-menu-item>
          <!-- 所有标签弹出框 -->
          <el-dialog v-model="dialogVisible" width="30%">
            <template #header>
              <div class="dialog-title flex">
                <el-icon color="#3F51B5" style="margin-right: 4px"><PriceTag /></el-icon>
                全部标签
              </div>
            </template>
            <el-card class="box-card">
              <div class="flex flex-wrap">
                <el-button
                  v-for="(tag, index) in tagnamesArr"
                  :key="index"
                  :color="tagColor[index]"
                  class="flex flex-wrap"
                  @click="
                    changeToHomeTagblogs(tag);
                    dialogVisible = false;
                  "
                >
                  {{ tag }}
                </el-button>
              </div>
            </el-card>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
              </span>
            </template>
          </el-dialog>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCurrentInstance, ref, onMounted, reactive, toRefs, watch } from 'vue';
import { router } from '@/router/index';
import HomeTagBlogs from './HomeTagblogs.vue';
export default {
  setup(props) {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      tagnamesArr: [], //标签名数组
    });
    const tagColor = [
      '#3F51B5',
      '#ead0d1',
      '#b5c4b1',
      '#faead3',
      '#c9c0d3',
      '#8696a7',
      '#e4ebf6',
      '#eee5f8',
      '#ead0d1',
      '#3F51B5',
      '#ead0d1',
      '#b5c4b1',
      '#faead3',
      '#e4ebf6',
    ];
    onMounted(() => {
      // 获取已有标签名
      const tagnames = proxy.$api.getTagnames();
      console.log(tagnames);
      tagnames.then(
        (value) => {
          console.log('getTagName', value.data.data);
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
    const dialogVisible = ref(false);
    return {
      handleOpen,
      handleClose,
      tagColor,
      dialogVisible,
      // 扩展运算符可将数组或对象转换成以逗号分隔的参数序列
      ...toRefs(data), //toRefs
      changeToHomeTagblogs,
    };
  },
};
</script>
<style lang="scss" scoped>
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
  height: 38rem;
  text-align: center;
  background-color: #fff;
  box-sizing: border-box;
  padding: 1rem 0;
  .tag-title {
    margin: 1.5rem 0;
    color: #3f51b5;
    font-weight: 550;
  }
  .menu-item {
    color: #667a99;
  }
}
.tag-icon {
  border-radius: 4px;
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: -3px;
  margin: 0 10px 0 1px;
}
::v-deep .el-button {
  margin: 12px 10px 0 0;
  .el-button {
    margin-left: 0;
  }
}
.dialog-title {
  align-items: center;
  color: #3f51b5;
  font-weight: 550;
}
::v-deep .el-card {
  margin-top: -15px;
}
</style>
