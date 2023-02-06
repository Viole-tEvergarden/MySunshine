
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    component: () => import('@/components/layout/layout.vue'),
    redirect: '/home',
    children:[
      {
        path: '/home',
        component: ()=>import('@/view/home.vue')
      },
      {
        path: '/main',
        component: ()=>import('@/view/Main.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/view/login.vue')
  },
]

//创建路由实例并传递 routes 配置
const router = createRouter({
  // 内部实现了 history 模式
  history: createWebHashHistory(), //使用 hash 模式
  routes
})

export default router