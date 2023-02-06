<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="mySide">
        <Aside :isCollapsed="isCollapsed" />
      </el-aside>
      <el-main>
        <Header :isCollapsed="isCollapsed"/>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
  import Aside from './Aside.vue'
  import Header from './Header.vue'
  import { reactive, ref } from 'vue'

  let isCollapsed = ref(false);
</script>
<style scoped>
.mySide{
  height: 100vh;
  background-color: var(--menuBackground);
  overflow-y: scroll;
}
.mySide::-webkit-scrollbar {
  width: 0;
}
::v-deep .el-main{
  position: relative;
  padding-top: 90px;
}
</style>