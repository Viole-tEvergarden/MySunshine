<template>
  <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
    <el-form-item label="歌曲名">
      <el-input v-model="ruleForm.songTitle" required />
    </el-form-item>
    <el-form-item label="歌手名">
      <el-input v-model="ruleForm.singer" required />
    </el-form-item>
    <el-form-item label="专辑">
      <el-input v-model="ruleForm.album" />
    </el-form-item>
    <el-form-item label="封面" required>
      <el-upload v-model:file-list="coverImage" accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP" action="http://localhost:3000/upload" :limit="1" class="upload-demo"
        list-type="picture">
        <el-button type="primary">封面上传</el-button>
        <template #tip>
          <div class="el-upload__tip">
            不要超过500k
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item label="歌曲文件" required accept=".mp3, .flac">
      <el-upload v-model:file-list="musicFile" accept="" action="http://localhost:3000/upload"
        :limit="1">
        <el-button type="primary">歌曲上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="歌词文件" required accept="lrc">
      <el-upload v-model:file-list="lyricFile" action="http://localhost:3000/upload" :limit="1">
        <el-button type="primary">歌词上传</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">
        提交
      </el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { addSong } from '../api/upload'
import { ElMessage, FormInstance, FormRules, UploadUserFile } from 'element-plus'
const emit = defineEmits(['close'])
const coverImage = ref<UploadUserFile[]>([]);//图片封面
const musicFile = ref<UploadUserFile[]>([]);//歌曲文件
const lyricFile = ref<UploadUserFile[]>([]);//歌词文件
const formSize = ref('default');
const ruleForm = reactive({
  songTitle: '',
  singer: '',
  album: '',
})
const getFileId = (file: any): string => {
  return file.response.data.insertId;
}
// 提交
const submitForm = async () => {
  const data = {
    ...ruleForm,
    coverImageId: getFileId(coverImage.value[0]),
    musicFileId: getFileId(musicFile.value[0]),
    lyricFileId: getFileId(lyricFile.value[0]),
  }
  if (checkObjHasEmptyValue(data, ['album'])) {
    const { code, msg } = (await addSong(data) as any);
    if (code === "00000") {
      ElMessage.success(msg);
      emit('close')
    } else {
      ElMessage.error(msg)
    }

  } else {
    ElMessage.error('请填写完整信息')
  }
}


const resetForm = () => {

}
const checkObjHasEmptyValue = (obj: { [key: string]: any }, continueFeild: Array<string>): boolean => {
  for (const key in obj) {
    if (continueFeild.includes(key)) {
      continue
    }
    if (obj.hasOwnProperty(key) && obj[key] === undefined || obj[key] === null || obj[key] === '') {
      return false;
    }
  }
  return true;
}
</script>
<style scoped>
>>>.el-form-item__content {
  display: block;
}
</style>
