
import {createStore} from 'vuex';
 
export default createStore({
  state: {
    isLoading: false, //loading加载
    isMobile: false,
    isMenuStatus: false, //默认展开导航菜单
    userInfo: null, //用户登录信息
    menuRoute: [],  //保存所有路由菜单
    keepAliveRoute: ['dashboard']  //缓存的路由数组
  },
  getters:{
    isLoading: function(state) {
      return state.isLoading;
    },
    isMobile: function(state) {
      return state.isMobile;
    },
    isMenuStatus: function(state) {
      return state.isMenuStatus;
    },
    userInfo: function(state) {
      return state.userInfo;
    },
    menuRoute: function(state) {
      return state.menuRoute;
    },
    keepAliveRoute: function(state) {
      return state.keepAliveRoute;
    },
  },
  mutations: {
    getContinue(state, status) {
      state.isLoading = status;
    },
    setMobile(state, val) {
      state.isMobile = val
    },
    setMenuStatus(state, val) {
      state.isMenuStatus = val
    },
    setUserInfo(state, val){
      state.userInfo = val
    },
    setMenuRoute(state, val){
      state.menuRoute = val
    },
    setKeepAliveRoute(state, val){
      state.keepAliveRoute = val
    },
  }, 
  actions: {
    commitLoading({ commit }, status) {
      commit('getContinue', status);
    },
    commitMobile({ commit }, val) {
      commit('setMobile', val);
    },
    commitMenuStatus({ commit }, val) {
      commit('setMenuStatus', val);
    },
    commitUserInfo({ commit }, val) {
      commit('setUserInfo', val);
    },
    commitMenuRoute({ commit }, val) {
      commit('setMenuRoute', val);
    },
    commitKeepAliveRoute({ commit }, val) {
      commit('setKeepAliveRoute', val);
    },
  },
  modules:{

  }
})