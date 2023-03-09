<!--  -->
<template>
  <div>
    {{ obj }}
    <button @click="change()">按钮</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

  let obj = reactive({
    name: 'Jon',
    age: 18
  })
  let state = toRef(obj,'name');
  
  function change(params) {
    state.value = 'change'
    console.log(state);
  }
</script>
<style scoped>
</style>