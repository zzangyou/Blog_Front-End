// 记得npm i 初始化mock包噢
import Mock from 'mockjs'
import userApi from './mockData/user'

// 拦截请求 设计拦截请求的地址 及相关的数据
// 本地获取user数据
Mock.mock(/user\/login/,'post',userApi.login)
Mock.mock(/user\/register/,'post',userApi.register)
