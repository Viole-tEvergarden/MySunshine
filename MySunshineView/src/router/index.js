
import { createRouter, createWebHashHistory, RouterView } from "vue-router";

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: ()=>import('@/view/Home.vue')
  },
  {
    path: '/login',
    component: () => import('@/view/login.vue')
  },
  {
    path: '/Vue',
    icon: 'i-lang',
    meta: { title: 'Vue' },
    redirect: '/Mixin',
    children: [
      {
        path: '/Mixin',
        meta: { title: 'Mixin' },
        component: ()=> import('@/view/Mixin.vue'),
      },
      
    ]
  },
]

//创建路由实例并传递 routes 配置
const router = createRouter({
  // 内部实现了 history 模式
  history: createWebHashHistory(), //使用 hash 模式
  routes
})

export default router