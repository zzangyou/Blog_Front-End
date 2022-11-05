import { defineStore } from 'pinia';
import { useUserInfoStore } from './userInfo';
import { usePublicStore } from './public';
const store = {
  userInfo: useUserInfoStore,
  public:usePublicStore
};

export const useStore = (moduleName) => store(moduleName)();
