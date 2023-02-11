<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TopicIntro from '@/components/TopicIntro.vue';
import 'element-plus/theme-chalk/display.css';
// import { onMounted, ref, watch, nextTick, provide } from 'vue'; //要引入方法
// 局部组件刷新
/* const isRouterAlive = ref(true);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
provide('reload', reload); */
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-container class="main">
          <el-row justify="center">
            <el-col :span="4">
              <!-- 侧边导航栏 -->
              <el-aside style="flex: 1" class="hidden-xs-only">
                <!-- 一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件 -->
                <router-view name="aside"></router-view>
              </el-aside>
            </el-col>
            <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="16">
              <!-- 中间主要内容 -->
              <el-main>
                <router-view name="mainContent"></router-view>
                <!-- <router-view name="mainContent" v-if="isRouterAlive"></router-view> -->
              </el-main>
            </el-col>
            <el-col :span="4">
              <!-- 话题推荐 -->
              <el-aside style="background-color: grey; text-align: left" class="hidden-xs-only">
                <TopicIntro></TopicIntro>
              </el-aside>
            </el-col>
          </el-row>
        </el-container>
        <!-- 页脚 -->
        <el-footer style="background-color: #3F51B5">
        <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.common-layout{
  background-color: #f5f5f5;
}
.el-container {
  display: block;
}
.el-header {
  z-index: 999;
}
.el-aside {
  // flex是flex-grow、flex-shrink和flex-basis三个属性的缩写
  /*  flex-grow属性设置的值为扩张因子，指定了flex容器中的子项目如何分配容器的剩余空间。
  扩张因子默认为0，子元素项目将按照这个值所占权重分配容器的剩余空间。
  而假如只有一个元素设置了flex-grow属性，那么该元素会得到所有剩余空间 */
  /*flex-shrink属性指定了flex元素的收缩规则。flex元素仅在默认宽度之和大于容器的时候才会发生收缩。
  默认属性值为1，所以在空间不够的时候，子项目将会自动缩小。
  假如都设置flex-shrink为0，那么元素将不会缩小，宽度会超出父元素的宽度*/
  /*flex-basis属性指定了flex元素在主轴方向上的初始大小,如果设置了flex-basis值，那么元素占用的空间为flex-basis值；
  如果没有设置或者设置为auto，那么元素占据的空间为元素的width/height值*/

  flex: 1.3;
  width: 100%;
  // flex:1 ==> flex:1 1 auto
}
.el-main {
  flex: 3;
}
/* .main {
  margin-top: 61px;
  height: 100%;
} */
.el-footer {
  height: 160%;
}
</style>
