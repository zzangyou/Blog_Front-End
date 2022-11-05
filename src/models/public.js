export const usePublicStore = defineStore('userInfo', {
  state: () => {
    return {
      token:''
    };
  },
   getters:{

   },
   actions:{
    // 设置存储token
    setToken(token){
      this.token = token;
      localStorage.getItem(token);
    },
    // 清除token
    clearToken(){
      this.token=''
      localStorage.removeItem(token);
  },
  // 获取token
    getToken(){
      this.token = this.token||localStorage.getItem(token)
    }
   }
});
