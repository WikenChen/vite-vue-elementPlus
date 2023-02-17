/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import router from '@/router'
import { ElMessage } from 'element-plus'
import { PROJECT_TOKEN } from '@/utils/constant.js';

const http = import.meta.env.VITE_APP_PROXY_URL; // vite环境变量参数必须以VITE_开头

console.log(http, "baseUrl")
const request = axios.create({
  baseURL: http,
  timeout: 500000
})

request.interceptors.request.use(
  config => {
    // 请求头携带token发送
    const token = `Bearer ${localStorage.getItem(PROJECT_TOKEN)}`;
    localStorage.getItem(PROJECT_TOKEN) && (config.headers.Authorization = token);
    config.headers['auth-project-name'] = 'dss';
    return config;
  }, error => {
    return Promise.reject(error);
  })

// 响应拦截器
request.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if(!response.data.success){
        ElMessage.error(response.data.msg);
        // loading ...
      }else if(response.data.data.code === "ERROR"){
        // loading ...
        ElMessage.error("服务器错误");
      }else if(response.data.data.code === "TOKEN_ERROR"){
        // loading ...
        ElMessage.error("非法请求");
      }else if(response.data.data.code !== "SUCCESS"){
        // loading ...
        ElMessage.error(response.data.data.msg);
      }
      
      // 登录异常
      // "ACCESS_DENY"："访问未授权"、"TOKEN_EXPIRED"："用户登陆已过期"、 "AUTH_FAIL"："用户认证失败"
      if( ["ACCESS_DENY", "TOKEN_EXPIRED", "AUTH_FAIL"].includes(response.data.data.code) ){
        localStorage.removeItem(PROJECT_TOKEN);
        router.replace({ name: "login" });
      }
      return Promise.resolve(response.data);
    } else {
      if (response.data.msg) {
        // loading ...
        ElMessage.error(response.data.msg)
      }
      return Promise.reject(response.data);
    }
  },
  // 服务器状态码不是200的情况    
  error => {
    let data = error.response.data
    // loading ...
    if (data.code == 0) {
      ElMessage.error('服务器错误');
    } else {
      if (data.msg) {
        ElMessage.error(error.response.data.msg)
      } else {
        ElMessage.error('服务器错误');
      }
    }
    return Promise.reject(error.response);
  }
);

export {
  request, 
  http
}