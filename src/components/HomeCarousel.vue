<template>
   <div class="block text-center">
    <span class="demonstration"
      >Switch when indicator is hovered (default)</span
    >
    <el-carousel height="150px">
      <el-carousel-item v-for="item in carouselItem" :key="item">
       <div class="small justify-center" style="height: 100%;width: 100%;">
          <a :href="item.link"> 
          <img :src="item.imgsrc" alt="" style="height: 100%;width: 100%;">
           </a> 
       </div>
        <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import {defineComponent, reactive} from 'vue'
export default defineComponent(
  {
    components: {},
    setup(){
     const carouselItem=reactive([
       {imgsrc:new URL('../assets/images/carousel-1.jpg', import.meta.url).href,
        link:'https://github.com/zzangyou/Blog_Front-End'
       },
       {
         imgsrc:new URL('../assets/images/carousel-2.jpg', import.meta.url).href,
         link:'https://zzangyou.gitee.io/'
       },
       {
         imgsrc:new URL('../assets/images/carousel-3.png', import.meta.url).href,
         link:''
       }
     ])

      return{
        carouselItem
      }
    }
  }
)
</script>
<style lang="scss" scoped>
  .demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
