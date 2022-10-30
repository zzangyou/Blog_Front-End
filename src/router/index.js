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
      { path: '', components: {
        default:Home,
        aside:HomeAside
      } },
      { path: '/user/:id', components: {
        default:User,
        aside:UserAside
      } },
    ],
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
