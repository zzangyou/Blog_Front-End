import { LS_KEYS } from '@/utils/const';
export const useUserInfoStore = defineStore('userInfo', {
  state: () => {
    return {
      isLogin: Boolean(localStorage.getItem(LS_KEYS.JWT)),
    };
  },
});
