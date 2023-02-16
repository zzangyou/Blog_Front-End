/*
*环境配置文件
*开发环境
*测试环境
*线上环境
*/
/* 
开发环境：一般是本地开发时所使用的环境，改动很频繁
测试环境：较为稳定的版本，一般用于部署测试
生产环境：发布到线上的版本
*/
// 当前环境  默认线上
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
    development: {
        baseApi: '/public/'
    },
    test: {
        //  未来环境
        baseApi: '/test.future.com/public'
    },
    prod: {
        baseApi: '/public/'
    },
}
export default {
    env,
    ...EnvConfig[env]
}
