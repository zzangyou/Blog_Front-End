import { createApp } from 'vue';
// 引入pinia
import { createPinia } from 'pinia';
import { router } from './router';
import api from './api'
import './style.css';
import 'reset-css';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import './styles/element/index.scss'
const app = createApp(App)
// 改为单独注册app （为了注册icon）
const pinia = createPinia();
// 统一导入icon并注册

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia).use(router).mount('#app');

