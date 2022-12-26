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
  server: {
    port: 8000,
  },
  devServer: {
    // host: '127.0.0.1',
    // port: 8000,
    proxy: {
      '/public': {
        target: 'http://43.139.169.47:8080/',
        pathRewrite: { '^/public': '' },
        changeOrigin: true
      }
    }
  }
});
