<template>
  <el-upload
    drag
    action="#"
    :auto-upload="false"
    :show-file-list="true"
    :before-upload="beforeUpload"
    :on-change="change"
    accept=".xls,.xlsx"
  >
    <el-icon class="el-icon--upload"><upload-filled/></el-icon>
    <div class="el-upload__text">点击或者拖拽文件到此区域上传</div>
  </el-upload>
  <div class="mt-2">
    <el-button type="primary" link @click="$emit('download-template')">下载导入模板</el-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const emit = defineEmits(['select-file','download-template'])

const beforeUpload = (file)=>{
  const isLt10M = file.size/1024/1024 < 10
  if(!isLt10M){
    ElMessage.error('文件大小不能超过10MB!')
    return false
  }
  return true
}

function change(uploadFile){
  emit('select-file', uploadFile.raw)
}
</script>
