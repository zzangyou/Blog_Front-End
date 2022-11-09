import Mock from 'mockjs'
// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}
let userList =[]
// 模拟接口的格式如下
export default{
  /**
   * 用户注册
   * @param useraccount
   * @param username
   * @param password
   * @param email
   * @param verificationCode
   * @return {{code:number,message:string,data:object}}
   */
  register:config=>{
    const {useraccount,username,password,email,verificationCode}=JSON.parse(config.body)
    console.log(JSON.parse(config.body));
    userList.unshift({
      id:Mock.Random.guid(),
      useraccount:useraccount,
      username:username,
      password:password,
      email:email,
      verificationCode:verificationCode
    })
    return{
       code:100000,
       message:'注册成功',
       data:{
        useraccount:useraccount,
        username:username,
        password:password,
        email:email,
        verificationCode:verificationCode
       }
    }
  },

  /**
   * 登录
   *  @param useraccount
   *  @param password
   * @return {{code:number,message:string,data:object}}
   *  */
  login:config=>{
    const{useraccount,password} = JSON.parse(config.body)
    userList.some(u=>{
      if(u.useraccount===useraccount&&u.password===password)
        return{
        code:100000,
        message:'登录正常',
        data:{
          token: Mock.Random.guid(),
          useraccount:useraccount,
          password:password
        }
      }
      else{
        return{
          code:100001,
          message:'登录异常',

        }
      }
    })


  },
  /**
   * 发送邮箱验证码
   * @param
   */
 sendcaptcha:config=>{

 }

}
