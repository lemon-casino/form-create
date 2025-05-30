<template>
  <div>
    <el-table :data="rows" height="300" size="small" border>
      <el-table-column v-for="col in cols" :key="col" :prop="col" :label="col" />
    </el-table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  data: Array
})
const rows = computed(() => props.data.slice(0, 20))
const cols = computed(() => rows.value[0] ? Object.keys(rows.value[0]) : [])
</script>
