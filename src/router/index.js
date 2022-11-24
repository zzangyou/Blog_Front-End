import { createRouter, createWebHistory } from 'vue-router';
import CommonLayout from '@/layout/CommonLayout.vue';
import Home from '@/pages/Home.vue';
import User from '@/pages/User.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import HomeAside from '@/pages/HomeAside.vue'
import UserAside from '@/pages/UserAside.vue'
import WeiBo from '@/pages/WeiBo.vue'
import Comment from '@/pages/Comment.vue'
import HomeTagBlogs from '@/pages/HomeTagblogs.vue'

// 路由
const routes = [
  {
    path: '/',
    component: CommonLayout,

    children: [
      {
        path: '',
        components: {
          aside: HomeAside,
          mainContent: Home
        }
      },
      {
        name: 'toHometagblogs',
        path: 'showblogsbytag/:tagname',//声明parmas参数tagname
        components: {
          aside: HomeAside,
          mainContent: HomeTagBlogs
        },
        // 【路由的】props配置，可让路由组件更方便的接收到参数
        /* 值为布尔值 true，那么就会把该路由接收到的所有【params参数】，
        【以props形式】传给HomeTagBlogs组件 */
        props: { aside: false, mainContent: true }
        // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
      },
      {
        name: 'userInfo',
        path: '/user:id',
        components: {
          aside: UserAside,
          mainContent: User,//进入个人信息就默认主要内容显示“修改个人信息”了
        },
      },
      {
        path: 'lookweibo',
        components: {
          aside: UserAside,
          mainContent: WeiBo
        },
      },
      {
        path: 'lookcomment',
        components: {
          aside: UserAside,
          mainContent: Comment
        },
      }
    ],
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];
//创建并暴露路由器，并传递 `routes` 配置
export const router = createRouter({
  history: createWebHistory(),//使用createWebHistory的history模式，即路由路径不带'#'
  routes,
});

