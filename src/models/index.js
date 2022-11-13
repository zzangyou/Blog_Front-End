import { useUserInfoStore } from './userInfo';
import { usePublicInfoStore } from './publicinfo';
import { useBlogInfoStore } from './bloginfo';
const store = {
  userInfo: useUserInfoStore,
  publicInfo: usePublicInfoStore,
  blogInfo: useBlogInfoStore
};
// 调用useStore时传入标识名
export const useStore = (moduleName) => store[moduleName]();

/* export default{
  usePublicStore,
  useUserInfoStore,
  useBlogInfoStore
}
 */
