import { createApp } from 'vue';
// 引入pinia
import { createPinia } from 'pinia';
import { router } from './router';

import './style.css';
import 'reset-css';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import './styles/element/index.scss'

// 创建pinia
const pinia = createPinia();
// use(pinia)使用pinia
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  createApp(App).component(key, component)
}
createApp(App).use(pinia).use(router).mount('#app');
/*
相当于
const app = createApp(App);
app.use(pinia)
app.mount('#app');
*/
