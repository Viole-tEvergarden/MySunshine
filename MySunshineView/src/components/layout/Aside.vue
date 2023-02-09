<!-- slider -->
<template>
  <div class="slider">
    <div class="logo">
      <span v-if="!isCollapsed">MySunShine</span>
    </div>
    <el-menu
        text-color="var(--white)"
        active-text-color="var(--red)"
        background-color="var(--menuBackground)"
        class="el-menu-vertical-demo"
        :collapse="isCollapsed"
        :collapse-transition="false"
        unique-opened
        router
      >
      <template v-for="item in menu">
        <template v-if="item.children">
          <el-sub-menu :index="item.path" :key="item.path">
            <template #title>
              <i :class="`iconfont ${item.icon}`"></i>
              <span>{{ item.meta.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-sub-menu
                v-if="subItem.children"
                :index="subItem.path"
                :key="subItem.path"
              >
                <template #title>{{ subItem.meta.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.children"
                  :key="i"
                  :index="threeItem.path"
                  >{{ threeItem.meta.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="subItem.path"
                :key="subItem.path + 1"
                >{{ subItem.meta.title }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <i :class="`iconfont ${item.icon}`"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </template>
      </el-menu>
  </div>

</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useStore } from 'vuex'
  const props = defineProps(['isCollapsed']) 

  const { state }  = useStore();
  let menu = reactive([]);


  menu = fillterNotMenu(state.acount.routes);
  // 过滤不是menu的路由项
  function fillterNotMenu(menu) {
    return menu.reduce((prev, cur) => {
      if(!cur.NOTMN){
        prev.push({
          ...cur,
          path: cur.path.substring(1),//这里因为el-,el-menu 的 index 要用, 要把'/'去掉,不然hover效果没得,小白表示不知道为啥
          children: cur.children?fillterNotMenu(cur.children):undefined, //这里用空数组的话menu会认为有子菜单所以选择undefined
        })
      }
      return prev
    }, [])
  }
</script>
<style scoped>
.logo{
  height:70px;
  color: var(--red);
  line-height: 70px;
  font-size: 25px;
  text-align: center;
}

.iconfont{
  margin-right: 10px;
}
</style>
