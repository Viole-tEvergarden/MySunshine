// 引入路由
import router from './index.js'
import { Store } from "../store/index";
import { routerMap } from './routerMap.js'

// 异步加载路由
router.beforeEach( (to, from, next) => {
  const { state } =  Store;
  const token = state.acount.tokenInfo//判断登录状态
  if (token) {
    if (to.path === '/login') {
      next({path:'/home'})
    } else {
      if (JSON.stringify(state.acount.routes) === '[]'||true) {
        let asycRoute = createrRoute(state.acount.routes);
        router.addRoute(asycRoute)
      }
      next()
    }
  }else{
    next(to.path !== '/login' ? { path: '/login' } : true)
  }
  
  
})

// 遍历数据将componet路径转为组件
const createrRoute = (routes)=>{
  return routes.reduce((prev, cur) => {
    prev.push({
      ...cur,
      component: routerMap[cur.component],
      children: cur.children?createrRoute(cur.children):[]
    })
    return prev
  }, [])
}
