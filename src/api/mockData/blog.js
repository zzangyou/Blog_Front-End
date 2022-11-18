import Mock from 'mockjs'
// 后端 get请求 通过config.url获取传来参数
export default {
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
  }

  /*
  * 查看已发布微博
  */
}

