import Mock from 'mockjs'
// 模拟后端 get请求 从config.url获取参数，post请求则从config.body中获取参数
function param2Obj(url) {
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

let userList = []
// 模拟接口的格式如下
export default {

  // @占位符
  /**
   * 用户注册
   * @param useraccount
   * @param username
   * @param password
   * @param email
   * @param verificationCode//验证码
   * @return {{code:number,message:string,data:object}}
   */
  register: config => {
    // 对象解构
    const { useraccount, username, password, email, verificationCode } = JSON.parse(config.body)
    console.log(JSON.parse(config.body));
    userList.unshift({//unshift 将一个或多个元素添加到数组开头
      id: Mock.Random.guid(),
      useraccount: useraccount,
      username: username,
      password: password,
      email: email,
      verificationCode: verificationCode
    })
    return {
      code: 100000,
      message: '注册成功',
      data: {
        useraccount: useraccount,
        username: username,
        password: password,
        email: email,
        verificationCode: verificationCode
      }
    }
  },

  /**
   * 登录
   *  @param useraccount
   *  @param password
   *  @return {{code:number,message:string,data:object}}
   *  */
  login: config => {//config是截取到的前端所发送的请求 post请求可通过config.body拿到数据对象
    const { useraccount, password } = JSON.parse(config.body)
    // Array.some((currentValue,index,arr)=>{})遍历并检测数组中的元素是否满足指定条件
    userList.some(u => {//u代表当前数组元素
      if (u.useraccount === useraccount && u.password === password)
        return {
          code: 100000,
          message: '登录正常',
          data: {
            token: Mock.Random.guid(),
            useraccount: useraccount,
            password: password
          }
        }
      else {
        return {
          code: 100001,
          message: '登录异常',

        }
      }
    })
  },
  /**
   * 发送邮箱验证码
   * @param
   */
  sendcaptcha: config => {

  },

  /**
   * 修改个人信息
   * @param username
   * @param useraccount//账号
   * @param password//密码
   * @param email//邮箱
   * @param sex
   * @param region
   * @param birth
   * @param star
   * @param job
   * @param character
   * @return {{code:number,message:string,data:object}}
   */
  changePersonInfo: (config) => {
    const { username, useraccount, password, email, sex,
      region, birth, star, job, character } = JSON.parse(config.body)
    // JSON.parse(text,[reviver])将json字符串转换成对象
    console.log('#####', config);
    console.log('#####', config.body);
    userList.unshift({
      username,
      useraccount,
      password,
      email,
      sex,
      region,
      birth,
      star,
      job,
      character
    })
    return {
      code: 100000,
      message: '修改成功',
      data: {
        username,
        useraccount,
        password,
        email,
        sex,
        region,
        birth,
        star,
        job,
        character
      }
    }


  }

}
