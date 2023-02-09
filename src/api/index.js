import { request, http } from './api.js';
const baseUrl = `/manager/v1`;

export function getList() {
  return request({
    url: `${baseUrl}/projects`,
    method: 'get',
  })
}