<template>
  <div>
    <el-card>
      <!-- 评论发布模块 -->
      <div class="flex flex-column">
        <el-input v-model="commenttext" :rows="1" type="textarea" placeholder="发布你的评论" />
        <div class="commentbtn">
          <el-button class="btn" type="primary" plain>评论</el-button>
        </div>
      </div>
      <!-- 评论展示模块 -->
      <div class="showcomment" v-for="item in commentList" :key="item.cid">
        <!-- 父级评论 -->
        <div>
          <section class="jss177">
            <div class="jss178 css-faujvq">
              <div class="css-1p83tvv">
                <div class="css-3i9vrz">
                  <img :src="item.head" alt="" class="css-1hy9t21 avater" />
                </div>
              </div>
              <div class="userinfo">
                <span class="css-14tqbo1">{{ item.username }}</span>
                <span class="css-rf2lqt time">{{ item.ctime }}</span>
              </div>
            </div>
          </section>
          <div class="css-1tqv6h6 flex">
            <div>im comment</div>
          </div>
        </div>
        <!-- 子评论模块 -->
        <div>
          <section class="child-comment" v-for="citem in item.childList" :key="citem.cid">
            <ul>
              <li class="child-content">
                <div>
                  <span class="child-username">{{ citem.username }}: </span>
                  <span v-show="true"
                    >回复 <span class="child-username">@{{ citem.parentusername }} :</span></span
                  >
                  <span>{{ citem.comment }}</span>
                </div>
                <div class="time-content">
                  <div>
                    <span class="css-rf2lqt time">{{ citem.ctiem }}</span>
                  </div>
                  <el-button circle text class="btn" @click="dialogVisible = !dialogVisible">
                    <el-icon size="1.2rem"><ChatLineSquare /></el-icon>
                  </el-button>
                  <!-- v-show="isShowDelete(item.useraccount)" @click="deleteChildComment(item.bid,index)" -->
                  <el-button circle text
                    ><el-icon size="1.2rem"><Delete /></el-icon
                  ></el-button>
                </div>
                <!-- 发送子评论弹出框 -->
                <el-dialog v-model="dialogVisible" title="回复评论" width="30%" align-center>
                  <el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="dialogVisible = false">取消</el-button>
                      <el-button type="primary" @click="dialogVisible = false"> 发送 </el-button>
                    </span>
                  </template>
                </el-dialog>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { ref, inject, onMounted, toRefs, reactive, watchEffect, defineComponent, getCurrentInstance } from 'vue';
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const commenttext = ref('');
    //inject
    const List = inject('commentList');
    const state = reactive({
      commentList: '',
      childList: '',
    });
    //显示子评论模块并获取当前评论的子评论
    const getChildrenComment = () => {
      state.commentList.forEach((item) => {
        console.log(item.cid);
        proxy.$api.getChildrenComment(item.cid).then((res) => {
          console.log(res);
          const newres = reactive(res.data.data);
          item['childList'] = newres;
        });
      });
    };
    watchEffect(() => {
      state.commentList = List;
      getChildrenComment();
      console.log('commentList变化了');
    });
    //

    onMounted(() => {
      getChildrenComment();
    });
    /* const showChildrenComment=(cid)=>{
  proxy.$api.getChildrenComment(cid).then(
    res=>{
      console.log(res);
      const newres=reactive(res.data.data)
      state.childList=newres
    }
  )
  return true
} */
    // 发布子评论模态框
    const dialogVisible = ref(false);
    return {
      commenttext,
      ...toRefs(state),
      dialogVisible,
      getChildrenComment,
    };
  },
});
</script>
<style lang="scss" scoped>
@import 'http://at.alicdn.com/t/c/font_3274443_xjbb5lzlw7n.css';
.avater {
  width: 2.3rem;
}
.userinfo {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  .time {
    font-size: 0.4rem;
    margin-top: 0.05rem;
  }
}
:deep .el-card__body {
  padding: 1rem;
}
.commentbtn {
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 0.5rem 0 0;
  .btn {
    width: 3rem;
    font-size: 0.7rem;
    height: 1.5rem;
  }
}
.showcomment {
  margin-top: 1rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid #f2f2f2ce;
}
.child-comment {
  margin-top: 1rem;
  margin-left: 3rem;
  border-left: 2px solid #f2f2f2ce;
  font-size: 0.8rem;
  .child-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
    line-height: 1rem;
    .time-content {
      margin-top: 0.3rem;
      display: flex;
      align-items: center;
      .btn {
        margin-left: 1rem;
      }
      .time {
        font-size: 0.4rem;
        margin-top: 0.05rem;
      }
    }
    .child-username {
      margin-right: 0.2rem;
      color: #3f51b5;
      cursor: pointer;
    }
  }
}
</style>
