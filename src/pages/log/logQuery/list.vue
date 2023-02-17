<template>
  <Search :isShowSearch="isShowSearch" @trigger="handleTrigger">
    <template #searchGroup>
      <el-form :inline="true" :rules="searchRules" :model="searchForm">
        
        <el-form-item label="开始时间：" prop="startDate">
          <el-date-picker
            v-model="searchForm.startDate"
            type="datetime"
            placeholder="选择开始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate">
          <el-date-picker
            v-model="searchForm.endDate"
            type="datetime"
            placeholder="选择结束时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="日志等级：" prop="levels">
          <el-select v-model="searchForm.levels" placeholder="请选择日志等级" multiple collapse-tags clearable>
            <el-option label="ERROR" value="ERROR" ></el-option>
            <el-option label="WARN" value="WARN" ></el-option>
            <el-option label="INFO" value="INFO" ></el-option>
            <el-option label="DEBUG" value="DEBUG" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字：" prop="keywords">
          <el-input
            v-model="searchForm.keywords"
            placeholder="关键字"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </template>
  </Search>

  <div ref="main" style="width: 100%; height: 500px"></div>
</template>

<script setup>
import Search from "@/components/search.vue"
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
const searchRules = reactive({
  keywords: [ { required: true, message: '请填写日志条数', trigger: 'blur' } ],
});

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