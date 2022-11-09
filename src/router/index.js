import { createRouter, createWebHistory } from 'vue-router';
import CommonLayout from '@/layout/CommonLayout.vue';
import Home from '@/pages/Home.vue';
import User from '@/pages/User.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import HomeAside from '@/pages/HomeAside.vue'
import UserAside from '@/pages/UserAside.vue'

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
        path: '/user/:id',
        components: {
          aside: UserAside,
          mainContent: User
        }
      },
    ],
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];
//创建并暴露路由实例，并传递 `routes` 配置
export const router = createRouter({
  history: createWebHistory(),//使用createWebHistory的history模式，即路由路径不带'#'
  routes,
});

