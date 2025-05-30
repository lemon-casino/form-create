<template>
  <div class="py-4 text-center">
    <el-result v-if="status==='success'" icon="success" title="导入成功" />
    <el-result v-else-if="status==='error'" icon="error" title="导入失败" />
    <el-result v-else icon="info" title="准备导入数据" />
  </div>
</template>

<script setup>
const props = defineProps({ status:String })
</script>
