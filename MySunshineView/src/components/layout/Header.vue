<!-- header -->
<template>
  <div class="header">
    <div class="header-left">
      <span :class="value?'flod flodrotade':'flod'" @click="flod()">
        <el-icon :color="IconColor"><Fold /></el-icon>
      </span>
      <!-- 全屏 -->
      <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in breadList" :key="item.path" :to="{ path: item.path }">
          {{item.meta.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="header-right">
      <!-- 头像 -->
      <div class="user-header">
          <img src="../../assets/img/header.jpg" />
      </div>
      <!-- 用户名下拉菜单 -->
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          {{state.acount.username}}

        </a>
        <template #overlay>
          <a-menu @click="handleCommand">
            <a-menu-item key="loginout">
              <a href="javascript:;">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      
    </div>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted, watch } from 'vue'
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';

  const { state } = useStore();
  const route = useRoute();
  const router = useRouter();
  const props = defineProps(['isCollapsed']);
  const emit = defineEmits(['onupdateIsCollapsed'])
  let fullscreen = ref(false);//是否全屏
  let breadList = reactive([]);//面包屑数据
  const IconColor = ref('#000000'); //icon 颜色
  const { commit }  = useStore();

  watch(()=>route.currentRoute?.value.path, getBreadcrumb, { immediate: true, deep: true});

  onMounted(()=>{
    if (document.body.clientWidth < 1500)flod();
  })

  function flod(){// 收缩Menu
    console.log(props.isCollapsed);
    emit('onupdateIsCollapsed', !props.isCollapsed);
  }
  
  function getBreadcrumb() {
    let matched = route.matched;
    matched.map((item,i)=>{
      if (!item.meta.title) {
        matched.splice(i,1)
      }
    })
    //如果不是首页
    if (!isHome(matched[0])) {
      matched = [{ path: "/layout", meta: { title: "首页" } }].concat(matched);
    }
    breadList = matched;
  }
  function handleCommand({key}){ //用户名下拉菜单回调函数
    switch (key) {
      case 'loginout':
        commit('acount/setTokenInfo',false);
        router.push('./login');
        break;
    }
  }
  function isHome(route){//当前路由是否为主页
    // return route.name === "home";
  }
  function handleFullScreen(){//全屏显示
    let element = document.documentElement;
    if (fullscreen) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
        }
    }
    fullscreen = !fullscreen;
  }
</script>
<style scoped>
.header{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0 5px 5px #ccc;
}
.user-header>img{
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin-right: 10px;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-left: 10px;
    font-size: 25px;
    cursor: pointer;
    margin-right: 30px;
}
.flod{
  cursor: pointer;
  transition: all 0.8s;
}
.flodrotade{
  transform:rotate(90deg);
}
.flod>i{
  font-size: 25px;
}
.flod:hover i{
  color: #F07098;
}
.header-right,.header-left{
  padding-right: 20px;
  display: flex;
  align-items: center;
}
</style>