<template>
  <a-layout style="min-height: 100vh" v-if="showMenu">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline"  @click="turnRoute">
        <a-menu-item>
          <span class="anticon anticon-user">
            <i class="iconfont i-sun-fog"></i>
          </span>
          <span class="logo">MySunShine</span>
        </a-menu-item>
        <template v-for="(item, index) in menu" :key="item.path">
          <a-sub-menu v-if="item.children" :key="item.path">
            <template #title>
              <span class="anticon anticon-user">
                <i :class="`iconfont ${item.icon}`">
              </i></span>
              <span>{{ item.meta.title }}</span>
            </template>
            <a-menu-item v-for="ele in item.children" :key="ele.path">{{
              ele.meta.title
            }}</a-menu-item>
          </a-sub-menu>
          <a-menu-item :key="item.path + ''" v-else>
            <span class="anticon anticon-user">
              <i :class="`iconfont ${item.icon}`">
            </i></span>
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout style="position: relative;">
      <Header/>
      <a-layout-content style="margin: 66px 16px 0">
        <div>
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <a-layout v-else>
    <router-view></router-view>
  </a-layout>
</template>
<script lang="ts" setup>
import Header from "./components/layout/Header.vue";
import { reactive, ref, onMounted, watch} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import type { MenuProps } from 'ant-design-vue';
import { values } from "lodash";
type menu = {
  path: string;
  icon: string;
  meta: { title: string };
  redirect?: string;
  children?: Array<menu>;
  component?: string | object;
};
const router = useRouter();
const { state } = useStore();


let collapsed = ref<boolean>(false); //菜单当前收起状态
let selectedKeys = ref<string[]>(["/Mixin"]); //默认选中
onMounted(()=>{
  if (document.body.clientWidth < 1500)collapsed.value = true;
})

const noMenu: Array<string> = ["/login"]; //不显示菜单的路由
let showMenu = ref<boolean>(true); //是否显示菜单
router.beforeEach((to, from, next) => {
  next();
  showMenu.value = !noMenu.includes(to.path);
});

// 菜单选项
let menu: Array<menu> = reactive([]);
//侦听 是否切换登录页跟主页面 
watch(showMenu, async ()=>{
  menu = fillterNotMenu(state.acount.routes);
},{ immediate: true })
// 过滤不是menu的路由项
function fillterNotMenu(menu) {
  return menu.reduce((prev, cur) => {
    if (!cur.NOTMN) {
      prev.push({
        ...cur,
        path: cur.path,
        children: cur.children ? fillterNotMenu(cur.children) : undefined, //这里用空数组的话menu会认为有子菜单所以选择undefined
      });
    }
    return prev;
  }, []);
}

// 左侧菜单点击事件
const turnRoute: MenuProps['onClick'] = ({key}) => {
  // console.log('click', key);
  // 路由跳转
  router.push(key as string);
};


</script>
<style>
.logo {
  color: var(--red);
  font-size: 19px;
  text-align: center;
  line-height: 50px;
}
.iconfont {
  margin-right: 5px;
}
</style>
