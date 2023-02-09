import { request, http } from './api.js';
const BASEURL = 'gone-manage';

export function getNoticeSettings(pageNum, pageSize, data) {
  return request({
      url: `${BASEURL}/v1/noticeSettings/pageNum=${pageNum}/pageSize=${pageSize}`,
      method: 'get',
      params: data,
  });
}