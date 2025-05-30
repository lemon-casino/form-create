<template>
  <div>
    <el-alert :title="`数据预览最多展示100条数据，共${excelData.length}条`" type="info" :closable="false" class="mb-2" />
    <el-table :data="tableData" height="300" border>
      <el-table-column type="index" width="50" />
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" />
    </el-table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ excelData: Array, columns: Array })
const tableData = computed(() => props.excelData.slice(0,100))
</script>
