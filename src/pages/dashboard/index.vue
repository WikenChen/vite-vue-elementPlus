<template>
  <!-- <el-row class="pd20">
    <section v-if="isEdit">
      <el-button @click="submitData" class="mb5" type="primary">保存</el-button>
      <el-button @click="triggerCancel" class="mb5">取消</el-button>
      <QuillEditor v-model="content" style="height: 300px;"/>
    </section>
    <section v-else>
      <el-button @click="triggerEdit" class="mb5" type="primary">编辑</el-button>
      <div :style='`height: ${calculateTbHeight()}px`' style="overflow-y: auto;" v-html="contentText"></div>
    </section>
  </el-row> -->
  <div>123</div>
</template>

<script>
// import { getSystemParameters, saveOrUpdateHomePageData } from "@/api/dashboard";
// export default {
//   name: 'dashboard',
//   components:{
//     QuillEditor: ()=> import("@/components/editor.vue")
//   },
//   mounted(){
//     this._getSystemParameters()
//   },
//   data(){
//     return{
//       contentText: "",
//       content: "",
//       isEdit: false
//     }
//   },
//   methods:{
//     // 高度
//     calculateTbHeight(){
//       return this.$utils.fullHeight() - 180;
//     },
//     // 切换到编辑
//     triggerEdit(){
//       document.activeElement.blur() //取消默认聚焦
//       this.content = JSON.parse(JSON.stringify(this.contentText));
//       this.isEdit = !this.isEdit;
//     },
//     // 取消编辑
//     triggerCancel(){
//       document.activeElement.blur() //取消默认聚焦
//       this.isEdit = !this.isEdit;
//     },

//     // 获取首页信息
//     _getSystemParameters(){
//       this.contentText = "";
//       this.$utils.showLoading(true);
//       getSystemParameters().then(res=>{
//         if(res.data.success){
//           this.contentText = res.data.data;
//         }
//       }).finally(()=>{
//         this.$utils.showLoading(false);
//       })
//     },
//     // 编辑首页信息
//     submitData(){
//       document.activeElement.blur() //取消默认聚焦
//       this.$utils.showLoading(true);
//       const content = this.content.replace(/"/g, '\"')
//       saveOrUpdateHomePageData({value: content}).then(res=>{
//         if(res.data.success){
//           this.$message.success("保存成功");
//           this.isEdit = false;
//           this._getSystemParameters();
//         }else{
//           this.$utils.showLoading(false);
//         }
//       })
//     }
//   }
// }
</script>
<style lang="less" scoped>
// /deep/ .ql-container{
//   height:720px !important;
// }

</style>