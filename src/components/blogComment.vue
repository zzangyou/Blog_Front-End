<template>
  <div>
    <el-card>
      <!-- 评论发布模块 -->
      <div class="flex flex-column">
        <el-input v-model="commenttext" :rows="1" type="textarea" placeholder="发布你的评论" />
        <div class="commentbtn">
          <el-button class="btn" type="primary" plain @click="onAddComment">评论</el-button>
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
                  <img :src="item.avatar" alt="" class="css-1hy9t21 avatar" />
                </div>
              </div>
              <div class="userinfo">
                <span class="css-14tqbo1">{{ item.username }}</span>
                <span class="css-rf2lqt time">{{ item.ctime }}</span>
              </div>
            </div>
          </section>

          <div class="css-1tqv6h6 flex">
            <div>{{ item.comment }}</div>
          </div>

          <!-- 评论按钮 -->
          <div class="combtn">
            <!-- 发送评论按钮 （属于二级评论） -->
            <el-button class="btn" type="primary" plain @click="toAddChildrenComment(item.cid)"> 评论 </el-button>
            <!-- 删除评论  -->
            <el-button
              class="btn"
              type="danger"
              plain
              @click="ondeleteComment(item.cid)"
              v-show="isShowDelete(item.username)"
              >删除</el-button
            >
          </div>
        </div>

        <!-- 子评论模块 -->
        <div>
          <section class="child-comment" v-for="citem in item.childList" :key="citem.cid">
            <ul>
              <li class="child-content">
                <div style="text-align: left">
                  <span class="child-username">{{ citem.username }}: </span>
                  <!-- 👀  后期拓展：多级评论-->
                  <!--   <span v-show="citem.parentid==item.cid?true:false">回复 <span class="child-username">@{{citem.parentname}} :</span></span> -->
                  <span>{{ citem.comment }}</span>
                </div>
                <div class="time-content">
                  <div>
                    <span class="css-rf2lqt time">{{ citem.ctime }}</span>
                  </div>
                  <!-- 👀  后期拓展：多级评论-->
                  <!--      <el-button circle text class="btn" @click="toAddChildrenComment(citem.cid)">
                  <el-icon size="1.2rem"><ChatLineSquare /></el-icon>
                  </el-button> -->
                  <el-button circle text v-show="isShowDelete(citem.username)" @click="ondeleteComment(citem.cid)"
                    ><el-icon size="1.2rem"><Delete /></el-icon
                  ></el-button>
                </div>
              </li>
            </ul>
          </section>
          <!-- 发送子评论弹出框 -->
          <el-dialog v-model="dialogVisible" title="回复评论" :width="dialogWidth" align-center>
            <el-input v-model="childcomment" :rows="2" type="textarea" placeholder="Please input" />
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onAddChildrenComment"> 发送 </el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  ref,
  inject,
  onMounted,
  toRefs,
  reactive,
  watchEffect,
  defineComponent,
  getCurrentInstance,
  onUpdated,
} from 'vue';
import { useStore } from '@/models/index';
export default defineComponent({
  // 父组件需要传递的参数
  props: {
    bid: {
      //父组件传来bid
      type: Number,
    },
  },
  setup(props) {
    const { proxy } = getCurrentInstance();
    // 传入需要获取的pinia数据的模块
    const storePublic = useStore('publicInfo');
    // 获取当前用户名
    const currentUsername = storePublic.getUsername();
    const currentUseraccount = storePublic.getUseraccount();
    const commenttext = ref('');
    const childcomment = ref('');
    // 发布子评论模态框
    const dialogVisible = ref(false);
    let dialogWidth = ref('30%');
    // 拿到爷组件需要传递的数据
    const List = inject('commentList'); //拿到数组
    const addcomment = inject('addcomment'); //拿到函数
    const deletecomment = inject('deletecomment'); //拿到函数
    const addchildrencomment = inject('addchildrencomment'); //拿到函数
    // 父级评论值 点击评论时动态传递id
    let parentid = ref('');
    const state = reactive({
      commentList: '',
      childList: '',
    });
    watchEffect(() => {
      state.commentList = List;
      //  getChildrenComment()
      console.log('commentList变化了');
    });
    // 检测宽度dialog
    const initWidth = () => {
      const width = document.body.clientWidth;
      console.log(width);
      if (width < 600) {
        proxy.dialogWidth = '80%';
      } else {
        proxy.dialogWidth = '30%';
      }
    };

    //  判断是否显示删除评论按钮
    //  是的话显示 不是的话隐藏
    const isShowDelete = (commentusername) => {
      if (currentUsername == commentusername) {
        return true;
      } else {
        return false;
      }
    };
    //  删除评论
    const ondeleteComment = (cid) => {
      // 爷组件重新获取评论 需要获取props的bid
      const bid = props.bid;
      //  孙传爷组件
      const config = {
        cid: cid, //评论id
        bid: bid, //博客id
      };
      // 调用爷组件传递过来的函数 并将config作为参数
      deletecomment(config);
    };

    // 发布一级评论
    // 孙传爷组件 爷组件通过provide传递函数 【孙组件接收】并调用时传递config参数
    const onAddComment = () => {
      const bid = props.bid; //博客id
      console.log(bid);
      const config = {
        bid: bid,
        comment: commenttext.value,
        useraccount: currentUseraccount,
      };
      addcomment(config);
      proxy.commenttext = '';
    };
    // 触发发布二级评论
    const toAddChildrenComment = (parentid) => {
      dialogVisible.value = !dialogVisible.value;
      proxy.parentid = parentid;
      initWidth();
    };
    // 发布二级评论
    const onAddChildrenComment = () => {
      const bid = props.bid;
      console.log(parentid);
      const config = {
        bid: bid,
        useraccount: currentUseraccount,
        comment: childcomment.value,
        parentid: parentid.value,
      };
      addchildrencomment(config);
      proxy.childcomment = '';
      dialogVisible.value = !dialogVisible.value;
    };
    return {
      commenttext,
      childcomment,
      parentid,
      ...toRefs(state),
      dialogVisible,
      dialogWidth,
      //  getChildrenComment,
      toAddChildrenComment,
      isShowDelete,
      onAddComment,
      ondeleteComment,
      onAddChildrenComment,
    };
  },
});
</script>
<style lang="scss" scoped>
@import 'http://at.alicdn.com/t/c/font_3274443_xjbb5lzlw7n.css';
.avatar {
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
.combtn {
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
  .combtn {
    display: flex;
    justify-content: flex-end;
  }
}
.child-comment {
  padding-top: 0.3rem;
  margin-left: 3rem;
  border-left: 2px solid #f2f2f2ce;
  font-size: 0.8rem;
  .child-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1rem;
    line-height: 1rem;
    padding-right: 3rem;
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
@media screen and (max-width: 600px) {
  .el-dialog {
    width: 90% !important;
  }
}
</style>

