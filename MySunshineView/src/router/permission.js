// 引入路由
import router from './index.js'
import { Store } from "../store/index";

// 异步加载路由
router.beforeEach( (to, from, next) => {
  const { state } =  Store;
  const token = state.acount.tokenInfo//判断登录状态
  if (token) {
    if (to.path === '/login') {
      next({path:'/home'})
    } else {
      
      next()
    }
  }else{
    next(to.path !== '/login' ? { path: '/login' } : true)
  }
  
  
})

