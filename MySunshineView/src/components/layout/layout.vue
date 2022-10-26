<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="mySide">
        <Aside />
      </el-aside>
      <el-main>
        <Main />
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import Main from './Main.vue'
import Aside from './Aside.vue'
</script>
<style scoped>
.mySide{
  height: 100vh;
  background-color: var(--menuBackground);
}
</style>