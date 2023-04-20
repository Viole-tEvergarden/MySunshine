<!--  -->
<template>
  <div>
    <div class="buttonGrupt">
      <el-button type="success" plain @click="addDialog = true">新增</el-button>
      <el-button type="danger" plain @click="del">删除</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%;" tooltip-effect="dark">
      <el-table-column type="selection" width="55" />
      <el-table-column label="封面" prop="image" width="80">
        <template #default="scope">
          <el-image style="width: 46px; height: 46px;vertical-align: top;" :src="baseUrl + scope.row.image" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="音乐标题" />
      <el-table-column prop="artist" label="歌手" width="280" show-overflow-tooltip />
      <el-table-column prop="album" label="专辑" width="180" show-overflow-tooltip />
      <el-table-column prop="duration" label="时长" width="90" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
  <el-dialog v-model="addDialog">
    <el-switch v-model="isHasInfo" size="small" active-text="带有基本信息的音乐文件" inactive-text="没有基本信息的音乐文件" />
    <el-divider />
    <AddHasInfoMusic @close="addDialog = false" v-show="isHasInfo" />
    <AddNoInfoMusic @close="addDialog = false" v-show="!isHasInfo" />
  </el-dialog>
</template>

<script lang="ts" setup>
import AddHasInfoMusic from './AddMusicHasInfo.vue'
import AddNoInfoMusic from './AddMusicNoinfo.vue'
import { onMounted, ref } from 'vue'
import { getSongList } from '../api/music'
import { secondsToMinutes  } from '../utils/index'
const addDialog = ref(false);//添加歌曲弹层
const isHasInfo = ref(true); //是否上传含有基础信息的音乐文件
const baseUrl = import.meta.env.VITE_REQUEST_BASE_URL

const del = () => {

}
const handleClick = () =>{

}
let tableData= ref([]);

onMounted( async ()=>{
  const data = (await getSongList() as any);
  if (data.code === "00000") {
    const d = data.data.map((item) => {
      item.duration = secondsToMinutes(item.duration)
      return item
    })
    tableData.value = d
  }
})
</script>
<style scoped>
.buttonGrupt {
  padding: 10px;
  background-color: white;
  border-radius: 5px 5px 0 0;
}
.coveImg{
  width: 70px;
}
</style>