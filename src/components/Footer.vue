<template>
     <el-row class="row-bg footer-font" justify="center">
     <el-col  :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
      <div >
    <div class="footer-box">logo</div>
    <span>@2023 • ColorwinBlog</span>
      </div>
     </el-col>
      <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6">
       <div class="flex flex-column">
     <div class="footer-box flex flex-center">
      <i size="12" class="icon">
        <el-icon><Message /></el-icon>
        </i>
      <span>联系我们</span>
    </div>
    <div>
      <i></i>
      <span class="sm-font">ICP备案:粤ICP备2022147205号</span>
    </div>
       </div>
     </el-col>
   </el-row>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  .footer-font{
    font-family: Roboto,-apple-system,Helvetica Neue,Helvetica,Arial,sans-serif;
    align-items: center;
    bottom: 0;
    color: #fff;
    padding: 1rem 0;
    text-align: center;
    width: 100%;
    .sm-font{
      font-size: .8rem;
    }
  }
  .footer-box{
    margin: 0 0 0.5rem;
    .icon{
    display: flex;
    justify-content: center;
    margin-right: .3rem;

    }
  }
</style>
