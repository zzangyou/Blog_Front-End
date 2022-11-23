// 该文件用于统一管理mock相关数据文件
// 记得npm i 初始化mock包噢
import Mock from 'mockjs'
import userApi from './mockData/user'
import blogApi from './mockData/blog'

// 【拦截请求】 设计拦截请求的地址 及相关的数据
// 本地获取user数据

Mock.mock(/user\/sendcaptcha/, 'post', userApi.sendcaptcha)
Mock.mock(/user\/login/, 'post', userApi.login)
// Mock.mock(rurl?, rtype?, template|function(options))
/* 三个参数。第一个：可选 表示需要拦截的 URL，可以是 URL 字符串或 URL正则，
第二个：可选表示需要 拦截的AJAx请求类型，如 get/post/put/delete等，
第三个：template： 可选表示数据模板，可以是对象或字符串
      function(options)： 可选 表示【用于生成响应数据】的函数
        options指向本次请求的 Ajax 选项集，含有 url、type、body 三个属性 */
Mock.mock(/user\/register/, 'post', userApi.register)
Mock.mock(/user\/getuserinfo/, 'post', userApi.getPersonInfo)
Mock.mock(/user\/changeuserinfo/, 'post', userApi.changePersonInfo)
Mock.mock(/blog\/addPost/, 'post', blogApi.addPost)
Mock.mock(/blog\/getAllBlog/, 'get', blogApi.getAllBlog)
Mock.mock(/blog\/getlike/, 'post', blogApi.getlike)
Mock.mock(/blog\/cancellike/, 'post', blogApi.cancellike)


Mock.mock(/user\/gettopic/, 'get', blogApi.getTopicIntroduce)
Mock.mock(/user\/avatar/, 'post', userApi.Avatar)
Mock.mock(/user\/getmyblog/, 'post', blogApi.watchUserBlogs)
Mock.mock(/blog\/getTagnames/, 'get', blogApi.getTagnames)
Mock.mock(/blog\/getBlogbyTagname/, 'post', blogApi.getBlogsbyTagname)


