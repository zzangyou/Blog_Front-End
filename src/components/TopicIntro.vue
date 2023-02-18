<script>
import { getCurrentInstance, reactive, ref, onMounted } from 'vue';

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    let data = reactive({
      // 将要改的数据作为对象的属性，这样才可以避免丢失响应式
      topicarr: [],
    });
    const toShowWarning=()=>{
    ElMessageBox.confirm(
    '功能暂未开启，敬请期待~~',
    {
      confirmButtonText: '我知道了',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    }
    onMounted(() => {
      // 发请求获取话题推荐
      const topic = proxy.$api.getTopic();
      console.log('@@topic@@');
      console.log(topic); //利用axios，请求成功返回的是一个promise对象
      topic.then(
        (value) => {
          console.log(value.data);
          console.log('请求成功');
          data.topicarr = value.data.data;
        },
        (reason) => {
          console.log('请求失败');
        },
      );
    });
    return {
      toShowWarning,
      data,
    };
  },
};
</script>

<template>
  <div class="topicreco">
    <!-- im topicintroduce -->
    <h1 class="flex flex-center topictitle">
      <el-icon color="#dd9292" size="20px" style="vertical-align: bottom;margin-right:2px"><Comment /></el-icon>
      今日热门话题
    </h1>
    <p v-for="(t, index) in data.topicarr" :key="t.id" class="topiccontent" @click="toShowWarning">
      <el-icon color='#dd9292'><StarFilled /></el-icon>
      <span style="font-weight: 700;">{{ index + 1 }}</span
      >&nbsp;&nbsp;{{ t.topicname }}
    </p>
  </div>
</template>

<style lang="scss">
.topicreco {
  width: 100%;
  padding: 1rem .5rem;
  background-color: #fff;
  box-sizing: border-box;
  overflow: hidden; // 超出部分隐藏
  .topictitle{
  margin: 1.5rem 0; 
  text-align: center;
  font-weight: 700;
  color: #5e6166;
  }
}
.topicreco .topiccontent {
  width: 15rem;
  margin-top: 0.6rem;
  color:#667a99;
  font-style: italic;
  white-space: nowrap; //设置文本不换行
  overflow: hidden; //溢出部分隐藏
  text-overflow: ellipsis; //溢出部分用省略号代替
}
.topicreco .topiccontent:hover {
  color: #3F51B5;
  cursor: pointer;
}
</style>
