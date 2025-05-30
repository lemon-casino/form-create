<template>
  <div>
    <div v-for="col in excelCols" :key="col" class="row">
      <span class="label">{{ col }}</span>
      <el-select v-model="mapping[col]" placeholder="Select field" size="small">
        <el-option v-for="f in fields" :key="f" :label="f" :value="f" />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { watch, reactive, computed } from 'vue'
const props = defineProps({
  data: Array,
  fields: Array,
  map: Object
})
const emit = defineEmits(['update-map'])
const mapping = reactive({})
watch(() => props.map, val => Object.assign(mapping, val), { immediate: true })
watch(mapping, val => emit('update-map', val), { deep: true })
const excelCols = computed(() => props.data[0] ? Object.keys(props.data[0]) : [])
</script>

<style scoped>
.row { display:flex; align-items:center; margin-bottom:8px; }
.label { width:120px; }
</style>
