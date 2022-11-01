import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import './style.css';
import 'reset-css';
import App from './App.vue';
// import './styles/element/index.scss'
const pinia = createPinia();
createApp(App).use(pinia).use(router).mount('#app');
