// axios二次封装的文件
import request from './request';
// 对api进行统一管理
export default{
  //  示例：如用户登录
  login(params){
    return request({
      url:'/user/login',
      method:'post',
      data:params
    })

  }
}
