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
        name: 'userInfo',
        path: '/user:id',
        components: {
          aside: UserAside,
          mainContent: User,//进入个人信息就默认主要内容显示“修改个人信息”了
        },
        children: [
          // {
          //   path: '',
          //   component: User
          // },
          {
            path: 'lookweibo',
            component: WeiBo
          },
          {
            path: 'lookcomment',
            component: Comment
          }
        ]
      },
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

