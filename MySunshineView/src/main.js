import { createApp } from 'vue'
import '@/assets/common/style.css'

import App from './App.vue'
import router from './router/index'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

// iconFont Icon
import './assets/icon/iconfont.css'
// elementPlus Icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// vuex 
import { Store } from "./store/index";



const app = createApp(App);

// 注册 Icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)
app.use(Antd)
app.use(Store)
app.mount('#app')

import './router/permission'
