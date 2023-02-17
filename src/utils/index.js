import { ElLoading } from 'element-plus';

const defaultOptions = {
  lock: true,
  text: '正在加载中...',
  background: 'rgba(0, 0, 0, 0.1)'
};


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
};

//获取当前时间 type为true则返回时分秒
export const getNowTime = (type) => {
  const now = new Date(),
    year = JSON.stringify(now.getFullYear()),
    month = (`${now.getMonth()+1}`).padStart(2, '0'),
    date = (`${now.getDate()}`).padStart(2, '0')

  let defaultDate = new Date(`${year}-${month}-${date}${type ? " 00:00:00" : ""}`);
  return defaultDate;
};

// 时间格式化
export const formatDate = (d, t)=>{
  if (d === "") {	
    return ""; 
  }
  const curDate = new Date(d),
    curYear = JSON.stringify(curDate.getFullYear()),
    curMonth = (`${curDate.getMonth()+1}`).padStart(2, '0'),
    curDay = (`${curDate.getDate()}`).padStart(2, '0')

  let curHour = '00',
    curMin = '00',
    curSec = '00'

  if (t) {
    curHour = `${curDate.getHours()}`.padStart(2, '0')
    curMin = `${curDate.getMinutes()}`.padStart(2, '0')
    curSec = `${curDate.getSeconds()}`.padStart(2, '0')
  }

  return `${curYear}-${curMonth}-${curDay} ${curHour}:${curMin}:${curSec}`
};

const utils = {
  loadingInstance: null,
  showLoading,
  getNowTime,
  formatDate
};

export { utils } 
