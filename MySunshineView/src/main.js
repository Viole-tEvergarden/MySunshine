import { createApp } from 'vue'
import '@/assets/common/style.css'

import App from './App.vue'
import router from './router/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// iconFont Icon
import './assets/icon/iconfont.css'

// elementPlus Icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App);

// 注册 Icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(ElementPlus).mount('#app')
