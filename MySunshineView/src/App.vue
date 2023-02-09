<template>
  <a-layout style="min-height: 100vh" v-if="showMenu">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item>
          <span class="anticon anticon-user">
            <i class="iconfont i-sun-fog"></i>
          </span>
          <span class="logo">MySunShine</span>
        </a-menu-item>
        <template v-for="(item, index) in menu" :key="index">
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
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          Bill is a cat.
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
  <a-layout v-else>
    <router-view></router-view>
  </a-layout>
</template>
<script lang="ts" setup>
// import Header from "@/components/layout/Header.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
type menu = {
  path: string;
  icon: string;
  meta: { title: string };
  redirect?: string;
  children?: Array<menu>;
  component?: string | object;
};

const router = useRouter();
let collapsed = ref<boolean>(false); //菜单当前收起状态
let selectedKeys = ref<string[]>(["/Mixin"]); //默认选中
const noMenu: Array<string> = ["/login"]; //不显示菜单的路由
let showMenu = ref<boolean>(true); //是否显示菜单
const { state } = useStore();
let menu: Array<menu> = reactive([]);

menu = fillterNotMenu(state.acount.routes);
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
router.beforeEach((to, from, next) => {
  next();
  showMenu.value = !noMenu.includes(to.path);
});
</script>
<style>
.logo {
  color: var(--red);
  font-size: 19px;
  text-align: center;
}
.iconfont {
  margin-right: 5px;
}
</style>
