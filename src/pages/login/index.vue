<template>
  <div class="login-wrap">
    <el-form
      ref="formRef"
      label-position="right"
      label-width="60px"
      class="login-form"
      :model="loginForm" 
      :rules="loginRules"
    >
    <div>
      <h3 class="title">登录</h3>
    </div>
      <el-form-item label="账号：" prop="username">
        <el-input 
          v-model="loginForm.username"
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input 
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          name="password"
          tabindex="2"
          @keyup.enter.native="handleLogin(formRef)" />
      </el-form-item>
      <el-button :loading="isLoading" :disabled="isLoading" type="primary" class="mt-30 w-100-percent" @click.native.prevent="handleLogin(formRef)">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { PROJECT_TOKEN, PROJECT_USER } from '@/utils/constant.js';
import router from '@/router';
import { login } from "@/api/login";
import md5 from 'js-md5';

const validateUser = (rule, value, callback) => {
  if(!value){
    callback(new Error('账号不能为空'));
  }else {
    callback();
  }
};
const validatePass = (rule, value, callback) => {
  //  密码只能由大小写英文字母或数字开头，且由大小写英文字母_.组成
  // const reg = /^[A-Za-z0-9][A-Za-z0-9_.]{5,14}$/;
  if(!value){
    callback(new Error('密码不能为空'));
  } else if (value.length < 6) {
    callback(new Error('密码不能少于6位'));
  } else {
    callback();
  }
};
const loginForm = reactive({
  username: '',
  password: '',
});
const loginRules = reactive({
  username: [{ trigger: 'blur', validator: validateUser }],
  password: [{ trigger: 'blur', validator: validatePass }]
});

const formRef = ref();
const isLoading = ref(false);

const handleLogin = (formRef) => {
  formRef.validate((valid) => {
    if (valid) {
      let loginData = JSON.parse(JSON.stringify(loginForm));
      loginData.password = md5(loginData.password);
      reqLogin(loginData);
    } else {
      return false;
    }
  })
};

const reqLogin = (formData) => {
  isLoading.value = true;
  login(formData).then(res=>{
    if(res.data.success){
      localStorage.setItem(PROJECT_TOKEN, res.data.data.access_token);
      localStorage.setItem(PROJECT_USER, formData.username);
      router.replace("/");
    }
  }).finally(() => { 
    isLoading.value = false;
  })
};
</script>

<style scoped lang="less">
.login-wrap {
  position: absolute;
  left: calc(50% - 200px);
  top: 20%;
  width: 400px;

  .login-form {
    text-align: center;
    max-width: 460px;
  }

  .title {
    font-size: 26px;
    color: #333;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>