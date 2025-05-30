<template>
  <el-upload
    drag
    action="#"
    :auto-upload="false"
    :on-change="onChange"
    :show-file-list="false"
    accept=".xls,.xlsx">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">Drop or click to upload</div>
  </el-upload>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['select-file'])

function onChange(file) {
  const raw = file.raw
  if (!raw) return
  const typeOk = /\.(xls|xlsx)$/i.test(raw.name)
  if (!typeOk) return ElMessage.error('Only Excel files')
  emit('select-file', raw)
}
</script>
