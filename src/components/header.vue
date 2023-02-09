<template>
  <div id="header-warp">
    <div class="dib">
      <el-icon class="trigger-menu-icon pointer">
        <component :is="isMenuStatus ? 'Expand' : 'Fold'" @click="triggerMenu"/>
      </el-icon>
      <el-breadcrumb separator="/" class="dib va-m">
      <template v-for="item in breadcrumbArr">
        <el-breadcrumb-item :key='item.name' v-if="item.meta.title">{{item.meta.title}}</el-breadcrumb-item>
      </template>
      </el-breadcrumb>
    </div>
    <div class="userinfo">
      <el-dropdown trigger="click">
        <span class="userinfoItem pointer">
          {{username}}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item>
              <div >修改密码</div>
            </el-dropdown-item> -->
            <el-dropdown-item>
              <div style="width: 120px;" @click="handleLogout">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { logout }  from "@/api/login";
import { computed } from 'vue';
import { PROJECT_TOKEN, PROJECT_USER } from '@/utils/constant.js';
import store from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox } from "element-plus";

const router = useRouter();
const route = useRoute();
const props = defineProps({
  username: String
});

const triggerMenu = () => {
  const currMenuStatus = store.getters.isMenuStatus;
  store.dispatch('commitMenuStatus', !currMenuStatus);
};

const handleLogout = () =>{
  ElMessageBox.confirm("是否退出登录？", '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    logout().then(res=>{
      if(res.data.success){
        store.dispatch('commitUserInfo', null);
        localStorage.removeItem(PROJECT_TOKEN);
        router.replace({name: 'login'});
      }
    })
  }).catch(() => { });
};

const isMenuStatus = computed(() => {
  return store.getters.isMenuStatus;
});
const breadcrumbArr = computed(() => {
  return route.matched;
});
</script>

<style lang="less" scoped>
#header-warp{
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  width: 100%;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #E4E7ED;

  .userinfo{
    display: inline-block;
    width: 250px;
    text-align: right;
    margin-right: 15px;
  }

  .trigger-menu-icon{
    font-size: 24px;
    vertical-align: middle;
    color: #666;
    margin-right: 10px;
  }
}
</style>