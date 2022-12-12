/*
*环境配置文件
*开发环境
*测试环境
*线上环境
*/
// 当前环境  默认线上
const env =import.meta.env.MODE || 'prod'
const EnvConfig ={
    development:{
        baseApi:'/public/'
    },
    test:{
        //  未来环境
        baseApi:'/test.future.com/public'
    },
     prod:{
        baseApi:'/public/'
    },
}
export default {
    env,
    ...EnvConfig[env]
}
