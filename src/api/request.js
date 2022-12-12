// 该文件用于【对axios进行二次封装】
// 引入axios
import axios from 'axios';
import config from '../config'
import { ElMessage } from 'element-plus'
import { router } from '../router/index'
import { LS_KEYS } from '@/utils/const';
const NETWORK_ERROR = '网络请求异常，请稍后重试'
// 添加 自定义配置的【新的axios】
const service = axios.create({//利用axios.create,创建一个新的axios实例并做一些配置
  // 根据环境 设置不同的 baseURL(基础路径，发请求的时候，路径当中会出现所配置的基础路径，不用自己手写)
  // 配置了前端反向代理,直接'/public'代理了本地数据的请求接口,后边跟的是线上的接口地址
  baseURL: config.baseApi,
  // 超时
  timeout: 10000,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  },
})
// 请求拦截器 - 所有的请求开始之前先到此处
// 这个 参数config 是个配置对象，对象里面有一个属性很重要，headers请求头
service.interceptors.request.use((config) => {
  // 可以设置 加载的动画效果 的展示
  // 在必要的路由设置一些额外的参数 ---- token信息携带放在此处
  // 将token放到请求头中发送给服务器
  const token = localStorage.getItem(LS_KEYS.JWT)
  if (token) {
    // 请求头携带token
    config.headers['Authorization'] = token
  }
  console.log('正在加载....')
  return config
}, (error) => {
  ElMessage.error(error)
  return Promise.reject(error)
})
// http response 拦截器

// 响应拦截器：包含两个函数（一个是成功返回的函数，一个是失败的返回的函数）
axios.interceptors.response.use(
  response => {
    // 成功的回调函数：服务器响应数据回来后，响应拦截器可检测到，就可以做一些事情
    return response;  //请求成功的时候返回一个数据
  },
  error => {
    try {
      if (error.response) {
        switch (error.response.status) {
          case 401://token过期，清除token并跳登录页面
            localStorage.clear();
            var baurl = window.location.href;
            router.replace({
              path: 'login',
              query: { backUrl: baurl }
            });
            return;
        }
      }
      return Promise.reject(error.response.data)

    }
    catch (e) {
      console.log(e);

    }
  });
function request(options) {//调用时传入配置对象作为参数
  // 对传入配置做一些分析处理
  options.method = options.method || 'get'//请求方式
  // 消除大小写
  if (options.method.toLowerCase() == 'get') {
    options.params = options.data
  }

  return service(options)//利用service(前面写的自定义配置的新的【axios的实例】)发请求
}

//对外暴露requests(axios的二次封装)
export default request
