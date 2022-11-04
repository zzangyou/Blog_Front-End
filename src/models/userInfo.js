import { LS_KEYS } from '@/utils/const';
// import { defineStore } from 'pinia';

// 使用pinia中的defineStore来创建一个store，一般命名为useXXXStore
// defineStore('标识该useXXXStore的名字',配置对象)，返回的是一个函数，
// 调用该函数就能得到一个包含state中的数据的proxy对象
export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      isLogin: Boolean(localStorage.getItem(LS_KEYS.JWT)),
    };
  },
});
