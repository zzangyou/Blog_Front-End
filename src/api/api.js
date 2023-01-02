// 该文件用于对api进行统一管理(请求的接口比较多，需要统一管理)
import request from './request';// 引入对axios进行二次封装的文件
// 将请求封装在api里，需要发请求时调用相应api即可。
import qs from 'qs';
export default {
  //  示例：如用户登录
  login(params) {
    // request(options)调用二次封装的axios 这个options就是mock所接收到的参数config
    return request({
      // 由于axios二次封装中配置了基础路径，所以url前面不用加http://.....
      url: '/user/login',
      method: 'post',//发送post请求
      // data: params
      data: qs.stringify(params),//发post请求时要传输的数据
      // 发送post请求时需要修改请求头
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
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
      data:params,//发post请求时要传输的数据
      // 发送post请求时需要修改请求头
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
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
   },
  deleteblog(params){
    return request({
      url:'blog/deleteblog',
      method:'post',
      data:params
    })
  },
  deletecomment(params){
    return request({
      url:'comment/deletecomment',
      method:'post',
      data:params
    })
  },
  addcomment(params){
    return request({
      url:'comment/addcomment',
      method:'post',
      data:params
    })
  },
  addchildrencomment(params){
    return request({
      url:'comment/addchildrencomment',
      method:'post',
      data:params
    })
  },
  getAllComment(params){
    return request({
      url:'blog/getAllComment',
      method:'get',
      data:params
    })
  },
  getChildrenComment(params){
    return request({
      url:'blog/getChildrenComment',
      method:'get',
      data:params
    })
  },

  // 获取话题推荐
  getTopic() {
    return request({
      url: 'user/gettopic',
      method: 'get'
    })
  },
  // axios是基于promise的，利用axios发请求，它的返回值也是一个promise对象

  // 头像传输
  sendAvatar(params) {
    return request({
      url: 'user/avatar',
      method: 'post',
      data: params
    })
  },
  // 获取用户已发布微博
  getUserBlogs(params) {
    return request({
      url: 'user/getmyblog',
      method: 'post',
      data: params
    })
  },
  // 获取已有标签
  getTagnames() {
    return request({
      url: 'blog/getTagnames',
      method: 'get'
    })
  },
  // 根据标签获取微博
  getBlogsbyTagname(params) {
    return request({
      url: 'blog/getBlogbyTagname',
      method: 'post',
      data: params
    })
  }
}
