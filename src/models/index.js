import { useUserInfoStore } from './userInfo';
import { usePublicInfoStore } from './publicinfo';
import { useBlogInfoStore } from './bloginfo';
 const store = {
  userInfo: useUserInfoStore,
  publicInfo:usePublicInfoStore,
  blogInfo:useBlogInfoStore
};

export const useStore = (moduleName) => store[moduleName]();

/* export default{
  usePublicStore,
  useUserInfoStore,
  useBlogInfoStore
}
 */
