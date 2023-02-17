<template>
  <div class="app-wrapper">
    <section class="left-wrap" :class="[!isMenuStatus ? 'show-menu-wid' : 'hide-menu-wid']">
      <el-menu 
        class="menu-wrap"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#fff"
        :collapse="isMenuStatus"
        :default-active="$route.path"
        router
      >
        <div class="logo">
          <h2 class="title color-white pointer dib" v-if="!isMenuStatus" @click="jumpHome">标题</h2>   
        </div>
        <SidebarItem :menu="routes" />
      </el-menu>
    </section>
    <div class="main-container" :class="[!isMenuStatus ? 'small-main' : 'big-main']">
      <Header :username="username" />
      <el-tabs v-model="activeTab" type="card" @tab-remove="removeTab" @tab-click="tabClick" class="content-wrap">
        <el-tab-pane 
          v-for="item in tabsItem"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          :closable="item.closable">
        </el-tab-pane>
      </el-tabs>
      <div class="content-word">
        {{ keepAliveRoute }}
        <router-view v-slot="{ Component }">
          <keep-alive :include="keepAliveRoute">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarItem from "@/components/menu.vue"
import Header from "@/components/header.vue"
import { useRoute, useRouter } from 'vue-router'
import store from '@/store';
import { onMounted, ref, watch, computed } from 'vue'
const route = useRoute();
const router = useRouter();

onMounted(()=>{
  triggerTab(route);
})

const activeTab = ref('/dashboard');
const tabsItem = ref(
  [
    {
      title: '首页',
      name: '/dashboard',
      comName: 'dashboard',
      closable: false
    }
  ]
)
const tabClick = (thisTab) => {
  /*
  * thisTab:当前选中的tabs的实例
  * 通过当前选中tabs的实例获得当前实例的path 重新定位路由
  * */
  router.push({ path: thisTab.props ? thisTab.props.name : thisTab.name });
}

const removeTab = (targetName) => { //删除Tab
  console.log(targetName)
  let tabs = tabsItem.value; //当前显示的tab数组
  let activeName = activeTab.value; //点前活跃的tab
  //如果当前tab正活跃 被删除时执行
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        let nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
          tabClick(nextTab);
        }
      }
    });
  }
  activeTab.value = activeName;
  tabsItem.value = tabs.filter(tab => tab.name !== targetName);

  const comName = tabs.find(tab => tab.name == targetName)?.comName;
  const setKeepAliveRoute = store.getters.keepAliveRoute.filter(el => el !== comName);
  store.dispatch('commitKeepAliveRoute', setKeepAliveRoute);
}
const triggerTab = (to) => {
  if(!tabsItem.value.some(item=>item.name === to.fullPath)){  //页面上不存在此tab，新增
    tabsItem.value.push({
      title: to.meta.title,
      name: to.fullPath,
      comName: to.name,
      closable: true
    })
    // 缓存路由
    if(to.meta.keepAlive){
      let setKeepAliveRoute = store.getters.keepAliveRoute;
      setKeepAliveRoute.push(to.name);
      store.dispatch('commitKeepAliveRoute', setKeepAliveRoute);
    }
  }
  activeTab.value = to.fullPath; //激活状态
};
const jumpHome = () => {
  router.push('/')
};

const isMenuStatus = computed(() => {
  return store.getters.isMenuStatus;
});
const routes = computed(() => {
  return store.getters.menuRoute;
});
const username = computed(() =>{
  return store.getters.userInfo?.name||"";
});
const keepAliveRoute = computed(() => {
  return store.getters.keepAliveRoute || [];
});
watch(() => route, (to)=>{
  triggerTab(to);
},{immediate: true,deep: true});
</script>

<style lang="less" scoped>
.app-wrapper{
  height: 100vh;
  display: flex;

  .left-wrap{
    transition: width 0.28s;
    height: 100%;
    vertical-align: top;

    .menu-wrap{
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .logo{
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    /deep/ .el-menu-item.is-active {
      background-color: #1890ff !important;
    }
  }

  .show-menu-wid{
    width: 238px !important;
  }

  .hide-menu-wid{
    width: 64px !important;
  }

  .small-main{
    width: calc(100vw - 240px) !important;
  }

  .big-main{
    width: calc(100vw - 66px) !important;
  }

  .main-container{
    // background: #f0f2f5;
    transition: width 0.28s;
    vertical-align: top;
  }

  .content-wrap{
    height: 35px; 
    
    /deep/ .el-tabs__header{
      margin: 0 !important;
    }

    .el-breadcrumb{
      margin: 10px 0;
    }
  }

  .content-word{
    background: #fff;
    box-sizing: border-box;
    padding: 10px 20px;
    height: calc(100vh - 95px);
  }
}
</style>