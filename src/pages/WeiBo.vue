<template>
  im查看已发布微博
  <div class="example-pagination-block">
    <!-- <div class="example-demonstration">When you have few pages</div> -->
    <el-pagination background layout="prev, pager, next" :total="50" :size="10" v-model:currentPage="currentPage" />
    <!-- current-page	当前页数，支持v-model双向绑定 -->
  </div>
</template>

<script>
import { reactive, setup, toRef, toRefs } from 'vue';

export default {
  setup() {
    const data = reactive({
      currentPage: 1, //当前页数
    });
    return {
      // 扩展运算符... 可将数组或对象转换成 以逗号分隔的参数序列
      ...toRefs(data),
    };
  },
};
</script>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>