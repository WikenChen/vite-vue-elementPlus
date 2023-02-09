import { createRouter, createWebHashHistory } from 'vue-router'
import { PROJECT_TOKEN, PROJECT_USER } from '@/utils/constant.js';
import Layout from '@/pages/layout/index.vue';
import { getInfo }  from "@/api/login";
import store from '@/store';
import { generatorRouter }  from "./permission.js";

const routes = [
  {
    path: '/login',
    name: 'login',
    hidden: true, //不在slider显示
    component: () =>
        import ('@/pages/login/index.vue'),
    meta: { keepalive: false, title: '登录' },
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true, //不在slider显示
    children: [{
        path: 'dashboard',
        name: 'dashboard',
        meta: { title: '首页' },
        component: () =>
            import ('@/pages/dashboard/index.vue'),
    }, ],
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    meta: { title: '首页', icon: 'HomeFilled' },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async(to, from, next) => {
  //   //获取token
  const hasToken = localStorage.getItem(PROJECT_TOKEN);
  if (hasToken) {
    //token存在，如果当前跳转的路由是登录界面，则跳回去首页
    if (to.path === '/login') {
      next({ ...from });
    }else{
      if(!store.state.userInfo){
        store.dispatch('commitMenuRoute', []);
        let username = localStorage.getItem(PROJECT_USER);
        let res = await getInfo({username});
        if(res.data?.success){
          if(res.data.data.permissionList.length < 1){
            Message.error('用户未授权，请重新登录');
            localStorage.removeItem(PROJECT_TOKEN);
            next({ name: 'login' });
          }else{
            store.dispatch('commitUserInfo', res.data.data);
            let routeArr = generatorRouter(res.data.data.permissionList);
            for(let item in routeArr){
              router.addRoute(routeArr[item]);
            }
            store.dispatch('commitMenuRoute', routes.concat(routeArr));
            next({ ...to });
          }
        }else{
          store.dispatch('commitUserInfo', null);
          localStorage.removeItem(PROJECT_TOKEN);
          next({ name: 'login' });
        }
      }else{
        next();
      }
    }
  } else {
    //token不存在
    if (to.path !== '/login') {
      next({ name: 'login' });
    }else{
      next();
    }
  }
});

export default router