// menu.json

//NOTMN 是否为menu true不加载到menu中, 没有该字段或为false加载到menu中

export default [
  {
    path: '/Vue',
    icon:'i-lang',
    meta: { title: 'Vue' },
    redirect: '/Mixin',
    children:[
      {
        path: '/Mixin',
        meta: { title: 'Mixin' },
        component: 'Mixin',
      },
      {
        path: '/keepAlive',
        meta: { title: 'KeepAlive' },
        component: 'keepAlive',
      },
      {
        path: '/nextTick',
        meta: { title: 'NextTick' },
        component: 'nextTick',
      },
      {
        path: '/Vuex',
        meta: { title: 'Vuex' },
        component: 'Vuex',
      }
    ]
  },
  {
    path: '/Form',
    icon:'i-gongji',
    meta: { title: '数据相关' },
    redirect: '/VueEditor',
    children:[
      {
        path: '/VueEditor',
        meta: { title: '富文本编辑' },
        component: 'VueEditor',
      },
      {
        path: '/MarkDown',
        meta: { title: 'Markdown编辑器' },
        component: 'MarkDown',
      }
    ]
  },
  {
    path: '/Other',
    icon:'i-maotouying',
    meta: { title: '其他' },
    redirect: '/eventDelegation',
    children:[
      {
        path: '/eventDelegation',
        meta: { title: '事件委托' },
        component: 'eventDelegation',
      }
    ]
  },
  {
    path: '/notFonud',
    icon:'i-daxiang',
    meta: { title: '404' },
    redirect:'/404'
  },
]
