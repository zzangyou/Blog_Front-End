import vue from '@vitejs/plugin-vue'

// 局部引入element-ui

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass'
      })],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass'
      })],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/element/index.scss" as *;',
      },
    },
  },

  //本地运行配置，以及【反向代理】配置
  server: {
    host: 'localhost',
    https: false,//是否启用 http
    cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
    open: true,//服务启动时自动在浏览器中打开应用
    port: '8000',
    strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端
    force: true,//是否强制依赖预构建
    hmr: false,//禁用或配置 HMR 连接
    // 反向代理配置
    proxy: {
      '/public/': { // 匹配所有以'/public/' 开头的请求路径
        target: 'http://43.139.169.47:8080', // 代理目标(请求地址)的基础路径
        changeOrigin: true, // 控制请求头中host值。如果为true，在请求服务器时不表明自己是代理服务器
      }
    }
  },
});
