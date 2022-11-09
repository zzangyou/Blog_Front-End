import { createApp } from 'vue';
// 引入pinia
import { createPinia } from 'pinia';
import {router} from './router'
import api from './api/index'
import './api/mock'
import './style.css';
import 'reset-css';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {useStore} from '@/models/index'
// import './styles/element/index.scss'
// 改为单独注册app （为了注册icon）
const app = createApp(App)
const pinia = createPinia();
// 统一导入icon并注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 全局挂载api 拿到api的方法
app.config.globalProperties.$api=api
// 此时注册pinia与router 解决外部js调用pinia时报错的问题，
app.use(pinia).use(router)
// 全局路由守卫 拦截所有路由
const storePublic = useStore('publicInfo');
router.beforeEach((to, from, next) => {
  // 获取用户登录态
const isLogin = storePublic.isLogin
/*   // 获取token
  const token = window.localStorage.getItem('token'); */
  // 有token
  if (isLogin) {
    // 直接放行
    next();
  } else {  // 否则是没有
    // 如果去的是登录页或注册页
    if (to.path === '/login'||to.path==='/register') {
      // 直接放行
      next();
    } else {
      // 如果去的是其他页,跳转到登录页
      // Message.error('请登录以后再操作！')
      // 跳转到登录页
      return next({ path: '/login' })
    }
  }
})
app.mount('#app');

