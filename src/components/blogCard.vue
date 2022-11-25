<template>
<div class="css-1qw96cp">
  <el-card shadow="hover" v-for="(item,index) in blogList" :key="item.bid"> 
    <section class="jss177">
      <div class=" jss178 css-faujvq">
        <div class="css-1p83tvv">
          <div class="css-3i9vrz">
            <img :src="item.avater" alt="" class="css-1hy9t21">
          </div>
        </div>
        <div class="userinfo">
          <span class="css-14tqbo1">{{item.username}}</span>
          <span class="css-rf2lqt">{{item.publishtime}}</span>
        </div>
      </div>
    </section>
    <div class="text-box">
  <h2 class="jss180 css-t1nuxs">{{item.title}}</h2>
  <!-- 后期修改：将json字符串转为模板字符串插入html -->
    <div class="css-1tqv6h6">
      <div  v-html="item.content"></div>
    </div>
    <div class="jss273">
      <section>
        <el-button v-for="(tag,index) in item.tagname" :key="index" :color="tagcolor[index]">
        {{tag}}
        </el-button>
      </section>
    </div>
    </div>
    <section class="jss275">
      <div class="jss276">
        <el-button @click="changelike(item.bid,index)" class="likebtn" circle text><i class="iconfont icon-dianzan"></i>
        <span class="css-1u6z2n7">{{item.like}}</span>
        </el-button>
        <el-button circle text><el-icon size="1.5rem"><ChatLineSquare /></el-icon></el-button>
        <el-button v-show="isShowDelete(item.useraccount)" @click="deleteBlog(item.bid,index)" circle text ><el-icon size="1.5rem"><Delete /></el-icon></el-button>
      </div>
      <div>
        <div class="flex flex-center">
          <p class="time">发布时间</p>
        </div>
        <div class="publishtime css-rf2lqt"><p>{{item.publishtime}}</p></div>
      </div>
    </section>
    <div class="imgcontainer flex">
  <div class="imgbox">
     <el-image v-for="(image,index) in item.blogpicture"
      :key=index
      class="blogimg"
      :src="image"
      :preview-src-list="item.blogpicture"
      :initial-index="4"
      fit="cover"
    />
  </div>
    </div>
     </el-card>
</div>
</template>
<script>
import {defineComponent, onMounted,reactive,watchEffect,toRefs,ref,getCurrentInstance,} from 'vue'
import { useStore } from '@/models/index';
export default defineComponent(
  {
  components:{
//  
    },
 // 父组件需要传递的参数
 props:{
   blogList:{
     type:Array
   },

  },
   setup(props,context){
     // 传入需要获取的pinia数据的模块
      const storePublic = useStore('publicInfo');
      const { proxy } = getCurrentInstance();
    //  解决父传子的prop值不是响应式
        const state = reactive({
        blogList:''
    })
    watchEffect(()=>{
       state.blogList = props.blogList
       console.log('blogList变化了');

    })
    //  判断博客发布者与当前登录用户是否为同一人 
    //  是的话显示 不是的话隐藏
      const isShowDelete=(blogUseraccount)=>{
      const currentUseraccount= storePublic.getUseraccount()
      if(currentUseraccount==blogUseraccount){
      return true
      }
      else {
      return false
       }
     }
 //删除当前微博
    const deleteBlog = (bid,index)=>{
    const obj={
      bid,index
    }
    context.emit('deleteblog',obj)
}
 //判断当前是否处于点赞状态
    let islike=ref(false)
    //  点赞or取消点赞微博
    const changelike =(bid,index)=>{
          const obj={
            bid,
            index
          }
        if(islike.value===false){
        console.log(bid,index);
        context.emit('getlike',obj)
        islike.value=true
        }
        else{
       context.emit('cancellike',obj)
        islike.value=false
      
        }
    } 
    // 标签颜色
    const tagcolor=['#3F51B5','#ead0d1','#b5c4b1','#faead3','#c9c0d3','#8696a7']
      return{
        deleteBlog,
        isShowDelete,
        tagcolor,
        ...toRefs(state),
        changelike,
      }
    }
  }
)
</script>
<style lang="scss" scoped>
@import 'http://at.alicdn.com/t/c/font_3274443_xjbb5lzlw7n.css';
  		.iconfont {
		  font-family: "iconfont" !important;
		  font-size: 1.55rem;
		  font-style: normal;
		  -webkit-font-smoothing: antialiased;
		  -moz-osx-font-smoothing: grayscale;
		}
  .userinfo{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }
  .text-box{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.3rem
  }
  .time{
    font-size: 0.8rem;
  }
  .publishtime{
    margin: 0.3rem 0;
  }
  .imgcontainer{
    justify-content: center;
    flex-wrap: wrap;
    .imgbox{
      width: 60%;
      height: 100%;
    }
    .blogimg{
      // width: 8rem;
      width: 29.33%;
      height: 8.5rem;
      margin: 0.2rem;
      border-radius: 0.5rem;
    }
  }
  :deep .el-card{
    margin-bottom: 2rem;

  }
  :deep .el-card:hover{
    background-color: rgba(254, 251, 251, 0.984);
  }
  :deep .likebtn{
    position: relative;
    margin-right: 0.5rem;
  }
</style>
