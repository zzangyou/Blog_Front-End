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
  useraccount:53499484,
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
}
}
