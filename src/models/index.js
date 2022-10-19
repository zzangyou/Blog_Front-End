import { defineStore } from 'pinia';
import { useUserInfoStore } from './userInfo';

const store = {
  userInfo: useUserInfoStore,
};

export const useStore = (moduleName) => store(moduleName)();
