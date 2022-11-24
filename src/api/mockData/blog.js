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
let blogList =  [{
  bid:1,
  username:'zzangyou',
  useraccount:534994484,
  avater:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F28%2F20210628204020_17863.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671672581&t=0e258b119be378c012a5d4eb3d7dcc94',
  publishtime:'2022/12/23 20:30',
  tagname:['日常','其他','心情'],
  title:'im title',
  content:'<strong>im content<strong/>',
  like:18,
  blogpicture:[
'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201908%2F11%2F20190811010152_ugtkd.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671670986&t=d5dfe438a5a1bab00f73ebf0cbe32dcc',
'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202012%2F30%2F20201230204240_74f0c.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671671052&t=71629cbdec638a7679311b91416537d6',
'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13959581631%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671671052&t=39815ef60949be04d479f142083bb7c2',
'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201907%2F17%2F20190717072310_84dQh.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671671052&t=8c6d1ff434b866765f3e2227560077d3',
'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201811%2F18%2F20181118174214_8yQjV.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671671052&t=6278e60c741dfbd3e2bfd3324cab7296',
'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202101%2F26%2F20210126132618_09f70.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671671052&t=b64beee007a862f3b9fa58325d04108f',
'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F24%2F20180724185732_qjyex.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671671052&t=2b21d23cc3a667a5da55502a168832ed',
'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201908%2F10%2F20190810165809_zLKYF.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671671052&t=142f96a09120823ced7e25e7651b537e',
'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F14%2F20200514180341_nzRjn.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671671052&t=7b28b389f4657316a6f8e4c85254f7d3',
]
}]
/* const count = 200

for (let i = 0; i < count; i++) {
  blogList.push(
    Mock.mock({
      bid: Mock.Random.guid(),
      username: Mock.Random.cname(),
      avater:Mock.mock('@Image(\'100x40\',\'#c33\', \'#ffffff\')'),
      publishtime: Mock.Random.date(),
      title:Mock.Random.ctitle(),
      'like|0-999':1,
      blogpicture:Mock.mock('@Image(\'100x40\',\'#c33\', \'#ffffff\')')
    })
  )
}
 */
export default{
/**
 * 发布微博
 * @param useraccount
 * @param content
 * @param title
 * @param tagname
 * @param blogpicture
 * @return {{code:number,message:string,data:object}}
 */
addPost:config=>{
  const {useraccount,content,title,tagname}=JSON.parse(config.body)
  console.log(JSON.parse(config.body));
  let blogpicture=''
  if(config.body.blogpicture){
    blogpicture=JSON.parse(config.body.blogpicture)
  }
  const bid=Mock.Random.id()
  blogList.unshift({
     bid: bid,
     content:content,
     useraccount:useraccount,
     title:title,
     tagname:tagname,
     blogpicture:blogpicture
  })
  return{
    code:100000,
    message:'正常',
    data:{
      bid: bid,
      useraccount:useraccount,
      avater:Mock.mock('@Image(\'100x40\',\'#c33\', \'#ffffff\')'),
      publishtime :Mock.Random.date()
    }
  }
},
/**
 * 获取所有微博
 * @param pageNumber
 * @param pageSize
 * @return {{code:number,message:string,data:object}}
 */
getAllBlog:config=>{
  const{pageNumber,pageSize}=JSON.parse(config.body)
  console.log('getAllBlog:'+JSON.parse(config.body));
  return{
    code:100000,
    message:'正常',
    data:blogList
  }
},
/**
 * 微博点赞
 * @param bid
 * @return {{code:number,message:string}}
 */
 getlike:config=>{
  //  const{bid}=JSON.parse(config.body)
   return{
     code:100000,
     message:'正常'
   }
 },
 /**
 * 微博取消点赞
 * @param bid
 * @return {{code:number,message:string}}
 */
deletelike:config=>{
  return{
    code:100000,
    message:'正常'
  }
},
deleteblog:config=>{
  return{
    code:100000,
    message:'正常'
  }
},

// 后端 get请求 通过config.url获取传来参数
  /**
   * 获取话题推荐
   * @return {{code:number,message:String,data:Array}}
  */
  getTopicIntroduce: config => {
    return {
      code: 100000,
      message: '话题推荐获取成功',
      data: [
        { topicid: 1, topicname: '多地取消核酸？', hot: 10, topictime: '2023/11/11' },
        { topicid: 2, topicname: '逐步开放？', hot: 8, topictime: '2024/11/11' },
        { topicid: 3, topicname: '病毒变异越来越危害', hot: 7, topictime: '2024/11/11' },
        { topicid: 4, topicname: '外部渗透', hot: 6, topictime: '2024/11/11' },
        { topicid: 5, topicname: '内部矛盾', hot: 6, topictime: '2025/11/11' },
        { topicid: 6, topicname: '隐隐的担忧...，不敢想象！', hot: 5, topictime: '2025/11/11' },
        { topicid: 7, topicname: '双11', hot: 4, topictime: '2022/11/11' },
        { topicid: 8, topicname: '三字男星二字女星', hot: 4, topictime: '2022/11/11' },
        { topicid: 9, topicname: '二字女星', hot: 4, topictime: '2022/11/11' },
        { topicid: 10, topicname: '666', hot: 3, topictime: '2025/11/11' },
        { topicid: 11, topicname: '777', hot: 3, topictime: '2025/11/11' },
        { topicid: 12, topicname: '857', hot: 2, topictime: '2022/11/11' },
        { topicid: 13, topicname: '番薯糖水', hot: 2, topictime: '2022/11/11' },
        { topicid: 14, topicname: '老火靓汤', hot: 2, topictime: '2022/11/11' },
        { topicid: 15, topicname: '真的假不了', hot: 2, topictime: '2022/11/11' },
        { topicid: 16, topicname: '当代大学生精神状态', hot: 1, topictime: '2022/11/11' },
        { topicid: 17, topicname: '教资', hot: 1, topictime: '2022/11/11' },
        { topicid: 18, topicname: '单身人口突破新高', hot: 1, topictime: '2022/11/11' },
        { topicid: 19, topicname: '未来养老院见', hot: 1, topictime: '2022/11/11' },
        { topicid: 20, topicname: '666', hot: 3, topictime: '2025/11/11' },
        { topicid: 21, topicname: '777', hot: 3, topictime: '2025/11/11' },
        { topicid: 22, topicname: '857', hot: 2, topictime: '2022/11/11' },
        { topicid: 23, topicname: '番薯糖水', hot: 2, topictime: '2022/11/11' },
        { topicid: 24, topicname: '老火靓汤', hot: 2, topictime: '2022/11/11' },
        { topicid: 25, topicname: '真的假不了', hot: 2, topictime: '2022/11/11' },
        { topicid: 26, topicname: '当代大学生精神状态', hot: 1, topictime: '2022/11/11' },
        { topicid: 27, topicname: '教资', hot: 1, topictime: '2022/11/11' },
        { topicid: 28, topicname: '单身人口突破新高', hot: 1, topictime: '2022/11/11' },
        { topicid: 29, topicname: '未来养老院见', hot: 1, topictime: '2022/11/11' },
      ]
    }
  },

  // @return	说明返回值类型
  // @param	说明一个方法的参数
  /**
   * 查看已发布微博
   *  @param useraccount
   *  @return {{code:number,message:String,blogsnumber:number,data:Array}}
  */
  watchUserBlogs: config => {
    // 该条件其实不应这么判断，而应是从众多用户名这查询比较，但这么写只是为了先获取假数据
    if (config.body == localStorage.getItem('currentuser')) {
      return {
        code: 100000,
        message: '用户已发布微博查询成功',
        // blogsnumber: data.length,为啥不行？？？
        blogsnumber: 30,
        data: [
          { bid: 1, publishtime: '', title: 'title1', content: '', like: 0, comment: 'comment1' },
          { bid: 2, publishtime: '', title: 'title2', content: '', like: 0, comment: 'comment2' },
          { bid: 3, publishtime: '', title: 'title3', content: '', like: 0, comment: 'comment3' },
          { bid: 4, publishtime: '', title: 'title4', content: '', like: 0, comment: 'comment4' },
          { bid: 5, publishtime: '', title: 'title5', content: '', like: 0, comment: 'comment5' },
          { bid: 6, publishtime: '', title: 'title6', content: '', like: 0, comment: 'comment6' },
          { bid: 7, publishtime: '', title: 'title7', content: '', like: 0, comment: 'comment7' },
          { bid: 8, publishtime: '', title: 'title8', content: '', like: 0, comment: 'comment8' },
          { bid: 9, publishtime: '', title: 'title9', content: '', like: 0, comment: 'comment9' },
          { bid: 10, publishtime: '', title: 'title10', content: '', like: 0, comment: 'comment10' },
          { bid: 11, publishtime: '', title: 'title11', content: '', like: 0, comment: 'comment11' },
          { bid: 12, publishtime: '', title: 'title12', content: '', like: 0, comment: 'comment12' },
          { bid: 13, publishtime: '', title: 'title13', content: '', like: 0, comment: 'comment13' },
          { bid: 14, publishtime: '', title: 'title14', content: '', like: 0, comment: 'comment14' },
          { bid: 15, publishtime: '', title: 'title15', content: '', like: 0, comment: 'comment15' },
          { bid: 16, publishtime: '', title: 'title16', content: '', like: 0, comment: 'comment16' },
          { bid: 17, publishtime: '', title: 'title17', content: '', like: 0, comment: 'comment17' },
          { bid: 18, publishtime: '', title: 'title18', content: '', like: 0, comment: 'comment18' },
          { bid: 19, publishtime: '', title: 'title19', content: '', like: 0, comment: 'comment19' },
          { bid: 20, publishtime: '', title: 'title20', content: '', like: 0, comment: 'comment20' },
          { bid: 21, publishtime: '', title: 'title21', content: '', like: 0, comment: 'comment21' },
          { bid: 22, publishtime: '', title: 'title22', content: '', like: 0, comment: 'comment22' },
          { bid: 23, publishtime: '', title: 'title23', content: '', like: 0, comment: 'comment23' },
          { bid: 24, publishtime: '', title: 'title24', content: '', like: 0, comment: 'comment24' },
          { bid: 25, publishtime: '', title: 'title25', content: '', like: 0, comment: 'comment25' },
          { bid: 26, publishtime: '', title: 'title26', content: '', like: 0, comment: 'comment26' },
          { bid: 27, publishtime: '', title: 'title27', content: '', like: 0, comment: 'comment27' },
          { bid: 28, publishtime: '', title: 'title28', content: '', like: 0, comment: 'comment28' },
          { bid: 29, publishtime: '', title: 'title29', content: '', like: 0, comment: 'comment29' },
          { bid: 30, publishtime: '', title: 'title30', content: '', like: 0, comment: 'comment30' },
        ]
      }
    } else {
      return {
        code: 100001,
        message: '用户已发布微博查询失败'
      }
    }
  },

  /**
   * 获取已有标签
   * @return {{code:number,message:String,data:Array}}
  */
  getTagnames: () => {
    return {
      code: 100000,
      message: '获取已有标签成功',
      data: ['日常', '美食', 'ootd', '摄影', '随手拍', '记录此刻']
    }
  },
  /**
   * 根据标签获取微博
   * @param tagname
   * @return {{code:100000,message:Strinng,data:Array}}
  */
  getBlogsbyTagname: config => {
    // console.log("getBlogsbyTagname", config.body);
    console.log('getBlogsbyTagname', JSON.parse(config.body)._value);
    let tagname = JSON.parse(config.body)._value;
    switch (tagname) {
      case '日常':
        return {
          code: 100000,
          message: '获取成功',
          data: [
            { bid: 1, title: '日常吃饭', content: '干饭了干饭了', like: 0 },
            { bid: 2, title: '日常睡觉', content: '睡觉了睡觉了', like: 0 },
            { bid: 3, title: '日常打豆豆', content: '打豆豆打豆豆', like: 0 },
          ]
        };
      case '美食':
        return {
          code: 100000,
          message: '获取成功',
          data: [
            { bid: 1, title: '羊肉手抓饭', content: '干饭了干饭了', like: 0 },
            { bid: 2, title: '芝士牛肉堡', content: '睡觉了睡觉了', like: 0 },
            { bid: 3, title: '饿到啃床板', content: '打豆豆打豆豆', like: 0 },
          ]
        };
      case 'ootd':
        return {
          code: 100000,
          message: '获取成功',
          data: [
            { bid: 1, title: '今天长这样', content: '干饭了干饭了', like: 0 },
            { bid: 2, title: '甜酷风', content: '睡觉了睡觉了', like: 0 },
            { bid: 3, title: '小仙女', content: '打豆豆打豆豆', like: 0 },
          ]
        };

      case '摄影':
        return {
          code: 100000,
          message: '获取成功',
          data: [
            { bid: 1, title: '长白山', content: '干饭了干饭了', like: 0 },
            { bid: 2, title: '大理', content: '睡觉了睡觉了', like: 0 },
            { bid: 3, title: '青岛', content: '打豆豆打豆豆', like: 0 },
          ]
        };
      case '随手拍':
        return {
          code: 100000,
          message: '获取成功',
          data: [
            { bid: 1, title: '夕阳', content: '干饭了干饭了', like: 0 },
            { bid: 2, title: '西下', content: '睡觉了睡觉了', like: 0 },
            { bid: 3, title: '断肠人在天涯', content: '打豆豆打豆豆', like: 0 },
          ]
        };
      case '记录此刻':
        return {
          code: 100000,
          message: '获取成功',
          data: [
            { bid: 1, title: '大学生', content: '干饭了干饭了', like: 0 },
            { bid: 2, title: '没有', content: '睡觉了睡觉了', like: 0 },
            { bid: 3, title: '惹你们任何人', content: '打豆豆打豆豆', like: 0 },
          ]
        };

    }
    return {
      code: 100001,
      message: '获取失败'
    }
  }

}


