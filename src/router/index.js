import { createRouter, createWebHistory } from 'vue-router';
import CommonLayout from '@/layout/CommonLayout.vue';
import Home from '@/pages/Home.vue';
import User from '@/pages/User.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';

const routes = [
  {
    path: '/',
    component: CommonLayout,
    children: [
      { path: '', component: Home },
      { path: '/user/:id', component: User },
    ],
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
