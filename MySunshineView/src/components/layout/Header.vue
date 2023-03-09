<!-- header -->
<template>
  <div class="header">
    <div class="header-left">
      <!-- 全屏 -->
      <div class="btn-fullscreen" @click="handleFullScreen">
        <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
          <fullscreen-outlined v-if="!fullscreen" :rotate="45"/>
          <fullscreen-exit-outlined v-if="fullscreen" :rotate="45"/>
        </el-tooltip>
      </div>
      <!-- 面包屑 -->
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item v-for="item in breadList" :key="item.path" :to="{ path: item.path }">{{item.meta.title}}</a-breadcrumb-item>
      </a-breadcrumb>
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
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  const { state } = useStore();
  const router = useRouter();
  const route = router.currentRoute.value;
  let fullscreen = ref(false);//是否全屏
  const { commit }  = useStore();

  const breadList = computed(()=>{
      // 过滤掉没有meta的 
      return router.currentRoute.value.matched.filter(item=>item.meta.title)
  })//面包屑数据


  function handleCommand({key}){ //用户名下拉菜单回调函数
    switch (key) {
      case 'loginout':
        commit('acount/setTokenInfo',false);
        router.push('./login');
        break;
    }
  }

  function handleFullScreen(){//全屏显示
    let element = document.documentElement;
    if (fullscreen.value) {
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
    fullscreen.value = !fullscreen.value;
  }
</script>
<style scoped>
.header{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 55px;
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