<template>
  <section id="search-wrap">
    <div class="icon-wrap" @click="handleTrigger">
      <el-icon>
        <component :is="isShowSearch ? 'ArrowUpBold' : 'ArrowDownBold'"></component>
      </el-icon>
    </div>
    <div v-show="isShowSearch" class="content-wrap">
      <el-form ref="formRef" :inline="true" :model="searchForm">
        <el-form-item v-for="item in optionsList" :label="item.key+'：'" :prop="item.field" :rules="item.rules">
          <component 
            class="w-200"
            :is="'el-'+item.name"
            v-model="searchForm[item.field]"
            :placeholder="item.key"
            :disabled="item.disabled"
            :type="item.type"
            :multiple="item.multiple || false"
            :collapse-tags="item.multiple"
            :collapse-tags-tooltip="item.multiple"
            :filterable="item.filterable || true"
            :format="item.format ? item.format : 'YYYY-MM-DD HH:mm:ss'" 
            :clearable="item.clearable || true"
          >
            <template v-if="item.name === 'select' && item.options">   <!--下拉-->
              <template v-if="item.keySlot && item.valueSlot">
                <el-option v-for="el in item.options" :label="el[item.keySlot]" :key="el[item.valueSlot]" :value="el[item.valueSlot]"></el-option>
              </template>
              <template v-else>
                <el-option v-for="el in item.options" :label="el.name" :key="el.value" :value="el.value"></el-option>
              </template>
            </template>
          </component>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchList(formRef)">查询</el-button>
          <el-button type="warning" @click="resetList(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script setup>
import { formatDate } from '@/utils';
import { ref } from 'vue';
const emits = defineEmits(['trigger', 'handleSearch', 'handleReset']);
const props = defineProps({
  isShowSearch: Boolean,
  searchForm: Object,
  optionsList: Array
});

const formRef = ref();

const handleTrigger = () => {
  const { isShowSearch } = props;
  emits('trigger', !isShowSearch);
};

const searchList = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      emitSearch('search');
    }
  })
};

const resetList = (formEl) => {
  formEl.resetFields();
  emitSearch('reset');
};

// 搜索、重置統一走emitSearch
const emitSearch = (type) =>{
  const { searchForm, optionsList } = props;
  let obj = JSON.parse(JSON.stringify(searchForm));

  optionsList.forEach(item=>{
    if(item.name === 'date-picker' && obj[item.field]){
      obj[item.field] = formatDate(obj[item.field])
    }
    if(typeof obj[item.field] === "string"){
      obj[item.field] = obj[item.field].trim();
    }
  });

  emits('handleSearch', obj, type);
};
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