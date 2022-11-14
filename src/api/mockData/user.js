import Mock from 'mockjs'
// 模拟后端   get请求从config.url获取参数，post请求则从config.body中获取参数
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
let userList = [{
  useraccount: 534994484,
  username: 'zzangyou',
  password: 'chenshuying',
  email: '534994484@qq.com',
  verificationCode: '',
  sex: '',
  region: '',
  birth: '',
  star: '',
  job: '',
  character: ''
}]
// let userList = []


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
    const { useraccount, username, Pass, email, verificationCode } = JSON.parse(config.body)
    console.log(JSON.parse(config.body));
    userList.unshift({
      id: Mock.Random.guid(),
      useraccount: useraccount,
      username: username,
      password: Pass,
      email: email,
      verificationCode: verificationCode,
      // 注册时后端也应有这些数据字段
      sex: '',
      region: '',
      birth: '',
      star: '',
      job: '',
      character: ''

    })
    return {
      code: 100000,
      message: '注册成功',
      data: {
        useraccount: useraccount,
        username: username,
        password: Pass,
        email: email,
        verificationCode: verificationCode,
        sex: '',
        region: '',
        birth: '',
        star: '',
        job: '',
        character: ''
      }
    }
  },

  /**
   * 登录
   *  @param useraccount
   *  @param password
   *  @return {{code:number,message:string,data:object}}
   *  */
  login: config => {
    console.log(config);
    const { useraccount, pass } = JSON.parse(config.body)//JSON.parse json字符串转换成对象
    console.log(useraccount, pass);
    const result = userList.some(u => {//u拿到当前数组元素 some方法返回的是布尔值
      return u.useraccount == useraccount && u.password == pass
    })
    if (result) return {
      code: 100000,
      message: '登录正常',
      data: {
        token: Mock.Random.guid(),
        useraccount: useraccount,
        password: pass
      }
    }
    else {
      return {
        code: 100001,
        message: '登陆失败'
      }
    }
  },
  /**
   * 发送邮箱验证码
   * @param
   */
  sendcaptcha: config => {
    console.log(config);
    return {
      code: 100000,
      message: '发送成功'
    }
  },

  /**
   * 获取个人信息
   * @param username//用户名(昵称)
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
  getPersonInfo: config => {
    console.log('this config is', config);
    const result = userList.find((currentValue) => {
      // find方法 遍历【返回】数组中第一个符合条件的【元素】
      // 找不到符合条件的元素则返回undefind
      console.log('config.body and currentValue.useraccount is', config.body, currentValue.useraccount);
      return config.body == currentValue.useraccount
    })
    console.log('getPersonInfo result', result);
    if (typeof result == 'undefined') {
      return {
        code: 100001,
        message: '获取失败',
      }
    } else {
      return {
        code: 100000,
        message: '获取成功',
        data: result
      }
    }
  },

  /**
   * 修改个人信息
   * @param username//用户名(昵称)
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
    // JSON.parse(text,[reviver])将json字符串转换成对象
    console.log('config.body', config.body);
    const result = userList.find((currentValue, index, arr) => {
      if (currentValue.useraccount == JSON.parse(config.body).useraccount) {
        currentValue = JSON.parse(config.body);
        console.log('the currentValue is', arr[index]);
      }
      return currentValue == JSON.parse(config.body).useraccount
    });
    console.log('changePersonInfo result', result);
    if (typeof result == undefined) {
      return {
        code: 100001,
        message: '修改失败',
      }
    } else {
      return {
        code: 100000,
        message: '修改成功',
        data: result
      }
    }

  }


}
