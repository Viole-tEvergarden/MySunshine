<!-- 登录注册 -->
<template>
  <div class="main">
    <div class="loginMain">
      <div class="brand">
        <i class="iconfont i-jingyu"></i>
        SunShine
      </div>
      <h2 class="subTitle">登录</h2>
      <!-- 用户名 -->
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.userName" clearable>
            <template #prefix>
              <el-icon color="#000"><User/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input type="password" v-model="form.passWord" show-password>
            <template #prefix>
              <el-icon color="#000"><Lock/></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 记住密码,忘记密码 -->
        <el-row justify="space-between" align="middle">
          <el-col :span="12">
            <el-checkbox v-model="form.remember" label="记住密码" size="large" />
          </el-col>
          <el-col :span="12" class="textRight">
            <router-link to="/">忘记密码?</router-link>
          </el-col>
        </el-row>
        <!-- 提交 -->
        <el-form-item>
          <el-button type="primary" plain @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  
</template>

<script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter();
  const form = reactive({userName: '隔壁老王', passWord:'admin123'});

  const login = () => {
    router.push('./')
  }

</script>
<style lang='scss' scoped>
.main{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/img/loginBackGround.jpg');
  background-size: 100% 100%;
  font-size: 14px;
  .loginMain{
    width: 300px;
    // height: 500px;
    position: absolute;
    top: 50%;
    left: 80%;
    transform: translate(-50%,-50%);
    background-color: #FFF;
    border-radius: 15px;
    box-shadow: -2px 2px 5px rgb(0 0 0 / 20%);
    overflow: hidden;
    padding: 0 20px;
    .brand{
      line-height: 35px;
      color: rgb(52, 141, 82);
      background-color: bisque;
      padding-left: 20px;
      margin: 0 -20px;
    }
    .subTitle{
      padding: 20px;
      font-size: 25px;
      text-align: center;
    }
    .line.dashed{
      border-bottom: 1px dashed var(--el-border-color);
    }
    .bottoM{
      margin-top: 20px;
      div{
        display: flex;
        align-items: center;
      }
      .textRight{
        flex-direction: row-reverse;
      }
    }
  }
}

.textRight{
  text-align: right;
}
::v-deep .el-button{
  width: 100%;
}
</style>