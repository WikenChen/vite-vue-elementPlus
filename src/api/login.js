import { request } from './api.js';

// 登录
export function login(params) {
  return request({
    url: `/lark-authentication/auth/token`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    params
  })
}

// 退出
export function logout() {
  return request({
    url: `/lark-authentication/auth/logout`,
    method: 'post',
  })
}

// 获取用户登录信息
export function getInfo(params) {
  return request({
    url: `/lark-system/v1/auth/username`,
    method: 'get',
    params
  })
}