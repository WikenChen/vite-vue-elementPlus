<template>
  <SearchForm 
    :isShowSearch="isShowSearch" 
    :searchForm="searchForm"
    :optionsList="optionsList"
    @trigger="handleTrigger"
    @handleSearch="searchList"
    />

  <div ref="main" style="width: 100%; height: 500px"></div>
</template>

<script setup>
import SearchForm from "@/components/searchForm.vue"
import { getNowTime } from '@/utils';
import { ref, reactive } from 'vue';


const main = ref();
const isShowSearch = ref(false);
const searchForm = reactive({
  levels: "",
  keywords: "",
  date: getNowTime(true)
});
const optionsList = reactive([
  { field: 'keywords', key: '关键字', name: 'input', rules:  {
        required: true,
        message: 'keywords can not be null',
        trigger: 'blur',
  }},
  { field: 'levels', key: '下拉', name: 'select', options: [{ key: '是', id: 1 }, { key: '否', id: 0 }], keySlot: 'key', valueSlot: 'id' },
  { field: 'date', key: '时间', name: 'date-picker', type: 'datetime'  },
]);

const searchList = (data, type) => {
  console.log(data, type);
};

// 显示/隐藏 搜索项
const handleTrigger = () => {
  isShowSearch.value = !isShowSearch.value;
}


</script>