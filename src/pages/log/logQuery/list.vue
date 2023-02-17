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
import { onMounted, ref, reactive } from 'vue';
import * as echarts from 'echarts';

onMounted(()=> {
  init();
})

const main = ref();
const isShowSearch = ref(false);
const searchForm = reactive({
  startDate: getNowTime(true),
  endDate: "",
  levels: "",
  keywords: ""
});
const optionsList = reactive([
  { field: 'startDate', key: '开始时间', name: 'date-picker' },
  { field: 'endDate', key: '结束时间', name: 'date-picker', type: 'datetime' },
  { field: 'levels', key: '日志等级', name: 'select', multiple: true, options: [{name: 'ERROR', value: 'ERROR'},{name: 'SUCCESS', value: 'SUCCESS'}] },
  { field: 'keywords', key: '关键字', name: 'input', rules: { required: true, message: '请填写关键字', trigger: 'blur' } },
]);

//搜索/重置
const searchList = (data, type) => {
  console.log(data, type)
};

// 显示/隐藏 搜索项
const handleTrigger = () => {
  isShowSearch.value = !isShowSearch.value;
}

// 初始化
const init = () => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(main.value);
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '日志查询'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize",function(){
    myChart.resize();
 });
}
</script>