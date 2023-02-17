<template>
  <div>
    <el-button @click="onSubmit">loading</el-button>
  </div>
</template>

<script>
export default {
  name: "dashboard",
}
</script>
<script setup>
import { getNoticeSettings } from '@/api/index';
import { showLoading } from '@/utils';

const onSubmit = async () => {
  showLoading(true);
  getNoticeSettings(1, 20, {}).then(res=>{
    console.log(res)
  }).finally(e=>{
    showLoading(false);
  })
}
</script>

<style lang="less" scoped>
</style>