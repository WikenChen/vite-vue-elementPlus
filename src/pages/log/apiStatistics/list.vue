<template>
  <SearchForm 
    :isShowSearch="isShowSearch" 
    :searchForm="searchForm"
    :optionsList="optionsList"
    @trigger="handleTrigger"
    @handleSearch="searchList"
    @handleReset="resetList"
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
  endDate: "",
  levels: "",
  keywords: "",
  date: getNowTime(true)
});
const optionsList = reactive([
  { field: 'keywords', key: '关键字', name: 'input', rules:  {
        required: true,
        message: 'domain can not be null',
        trigger: 'blur',
  }},
  { field: 'levels', key: '下拉', name: 'select', options: [{ name: '是', value: 1 }, { name: '否', value: 0 }] },
  { field: 'date', key: '时间', name: 'date-picker', type: 'datetime'  },
]);

const searchList = (data) => {
  console.log(data, "search")
};
const resetList = (data) => {
  console.log(data, "reset")
};

// 显示/隐藏 搜索项
const handleTrigger = () => {
  isShowSearch.value = !isShowSearch.value;
}


</script>