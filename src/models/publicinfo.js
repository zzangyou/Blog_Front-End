import { defineStore } from 'pinia'
import { LS_KEYS } from '@/utils/const';
export const usePublicInfoStore = defineStore('publicInfo', {
  state: () => {
    return {
      token: '',
      // 这里应该是登录态判断
      isLogin: Boolean(localStorage.getItem(LS_KEYS.JWT)),
    };
  },
  getters: {

  },
  actions: {
    //  采取 pinia 和 本地存储相结合的方式 来【存储 Token】
    // 设置并存储token
    setToken(token) {
      this.token = token;
      localStorage.setItem(LS_KEYS.JWT, token);
      this.isLogin=Boolean(localStorage.getItem(LS_KEYS.JWT))
    },
    // 清除token
    clearToken() {
      this.token = ''
      localStorage.removeItem(LS_KEYS.JWT);
      this.isLogin=Boolean(localStorage.getItem(LS_KEYS.JWT))
    },
    // 获取token
    getToken() {
      this.token = this.token || localStorage.getItem(LS_KEYS.JWT)
    }
  }
});
