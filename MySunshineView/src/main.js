import { createApp } from 'vue'
import '@/assets/common/style.css'

import App from './App.vue'
import router from './router/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/icon/iconfont.css'


const app = createApp(App);


app.use(router).use(ElementPlus).mount('#app')
