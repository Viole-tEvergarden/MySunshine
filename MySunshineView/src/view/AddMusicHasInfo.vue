<template>
  <el-form ref="ruleFormRef"  label-width="120px" class="demo-ruleForm" status-icon>
    <el-form-item label="歌曲文件" required>
        <el-upload v-model:file-list="musicFile" accept=".mp3" :on-success="fileSuccess" action="http://localhost:3000/upload" :limit="1">
          <el-button type="primary">歌曲上传</el-button>
        </el-upload>
      </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, UploadUserFile } from 'element-plus'
const musicFile = ref<UploadUserFile[]>([]);//歌曲文件
// 音乐上传成功
const fileSuccess = (res)=>{
  if (res.code !== '00000') {
    ElMessage.warning(res.msg)
  }
}

</script>
<style scoped>
>>>.el-form-item__content {
  display: block;
}
</style>
