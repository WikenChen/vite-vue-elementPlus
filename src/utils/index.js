import { ElLoading } from 'element-plus';

const defaultOptions = {
  lock: true,
  text: '正在加载中...',
  background: 'rgba(0, 0, 0, 0.1)'
}


// loading加载
export const showLoading = (type)=>{
  if( type && !utils.loadingInstance ){
    utils.loadingInstance = ElLoading.service(defaultOptions);
  } else {
    if (utils.loadingInstance) {
      utils.loadingInstance.close();
      utils.loadingInstance = null;
    }
  }
}

const utils = {
  loadingInstance: null,
  showLoading
}

export { utils } 
