import axios from 'axios';
import config from '../config'
import { ElMessage } from 'element-plus'
const NETWORK_ERROR='网络请求异常，请稍后重试'
// 添加自定义配置的新的axios
const request = axios.create({
  // 根据环境 设置不同的baseURL
  // 配置了前端反向代理,直接'/public'代理了本地数据的请求接口,后边跟的是线上的接口地址
  baseURL:config.baseApi,
    // 超时
   timeout: 10000
})
// 请求拦截器 - 所有的请求开始之前先到此处
// //config是个配置对象，对象里面有一个属性很重要，headers请求头
request.interceptors.request.use((config) => {
  // 可以设置 加载的动画效果 的展示
  // 在必要的路由设置一些额外的参数 ---- token信息携带放在此处
  // 将token放到请求头中发送给服务器
  const token = localStorage.getItem('token')
  if (token) {
    // 请求头携带token
    config.headers['Authorization'] =token
  }
  console.log('正在加载....')
  return config
}, (error) => {
  ElMessage.error(error)
  return Promise.reject(error)
})
