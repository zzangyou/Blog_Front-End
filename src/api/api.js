// 该文件用于对api进行统一管理(请求的接口比较多，需要统一管理)
import request from './request';// 引入对axios进行二次封装的文件

// 将请求封装在api里，需要发请求时调用相应api即可。
export default {
  //  示例：如用户登录
  login(params) {
    // request(options)调用二次封装的axios 这个options就是mock所接收到的参数config
    return request({
      // 由于axios二次封装中配置了基础路径，所以url前面不用加http://.....
      url: '/user/login',
      method: 'post',//发送post请求
      data: params
    })
  },
  register(params) {
    return request({
      url: '/user/register',
      method: 'post',
      data: params
    })
  },
  sendcaptcha(...params) {
    return request({
      url: '/user/sendcaptcha',
      method: 'post',
      data: { ...params }
    })
  },
  // 获取个人信息
  getUserInfo(params) {
    return request({//发请求
      url: 'user/getuserinfo',
      method: 'post',
      data: params
    })
  },
  // 修改个人信息
  changeUserInfo(params) {
    return request({
      url: 'user/changeuserinfo',
      method: 'post',
      data: params
    })
  },
  addPost(params){
    return request({
      url:'blog/addPost',
      method:'post',
      data:params
    })
  },
  getAllBlog(params){
    return request({
      url:'blog/getAllBlog',
      method:'get',
      data:params
    })
  },
  getlike(params){
    return request({
      url:'blog/getlike',
      method:'post',
      data:params
    })
  },
  cancellike(params){
    return request({
      url:'blog/cancellike',
      method:'post',
      data:params
    })
  }
}
