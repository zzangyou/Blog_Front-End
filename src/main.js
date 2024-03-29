import { createApp } from 'vue';
// 引入pinia
import { createPinia } from 'pinia';
import { router } from './router'
import api from './api/api'

//  import './api/mock'//引入mock文件
import './style.css';
import 'reset-css';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'// 统一导入icon并注册
import { useStore } from '@/models/index'
// 使rem适配不同屏幕
//  import 'amfe-flexible'
// import './styles/element/index.scss'
// 改为单独注册app （为了注册icon）
const app = createApp(App)
const pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {// 统一导入icon并注册
  app.component(key, component)
}
/* 【app.config.globalProperties】,是对Vue2中 Vue.prototype(在Vue3已经不存在) 使用方式的一种替代。
【可用于注册】能够被应用内所有组件实例访问到的【全局属性】*/
// 全局挂载api到自定义全局属性$api身上 这样通过$api就可以拿到api的方法
app.config.globalProperties.$api = api

// 注册pinia 与router 
app.use(pinia).use(router)

// 全局路由守卫 拦截所有路由
const storePublic = useStore('publicInfo');
router.beforeEach((to, from, next) => {
  // 获取用户登录态
  const isLogin = storePublic.isLogin
  // 获取token
  const token = window.localStorage.getItem('token');
  // 有token
  if (isLogin) {
    // 直接放行
    next();
  } else {  // 否则是没有
    // 如果去的是登录页或注册页
    if (to.path === '/login' || to.path === '/register') {
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

