import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

/*element plus*/
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';

import './style/index.less';
import './style/public.less';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
};

app.use(router).use(ElementPlus, {
  locale: zhCn,
}).mount('#app');
