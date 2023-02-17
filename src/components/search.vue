<template>
  <section id="search-wrap">
    <div class="icon-wrap" @click="handleTrigger">
      <el-icon>
        <component :is="isShowSearch ? 'ArrowUpBold' : 'ArrowDownBold'"></component>
      </el-icon>
    </div>
    <div v-show="isShowSearch" class="content-wrap">
      <slot class="content" name="searchGroup"></slot>
    </div>
  </section>
</template>

<script setup>
const emits = defineEmits(['trigger']);
const props = defineProps({
  isShowSearch: Boolean
});

const handleTrigger = () => {
  emits('trigger');
}
</script>

<style lang="less" scoped>
#search-wrap{
  width: 100%;
  position: relative;
  padding-bottom: 10px;

  .icon-wrap{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    font-size: 24px;
    cursor: pointer;
    margin-left: -20px;
    margin-right: -20px;
    box-shadow: 0 0 5px #eee;
  }

  .content-wrap{
    padding: 10px 0 0 0;
  }
}
</style>