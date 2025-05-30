<template>
  <div>
    <div v-for="col in excelColumns" :key="col" class="mb-2 flex items-center">
      <span class="mr-2" style="width:120px">{{ col }}</span>
      <el-select v-model="local[col]" filterable clearable placeholder="请选择">
        <el-option v-for="f in fieldOptions" :key="f.value" :label="f.label" :value="f.value" />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
const props = defineProps({ excelData:Array, columns:Array, columnMapping:Object })
const emit = defineEmits(['update-mapping'])
const local = reactive({...props.columnMapping})
const excelColumns = computed(() => props.excelData[0] ? Object.keys(props.excelData[0]) : [])
const fieldOptions = computed(() => props.columns.map(c=>({label:c.label,value:c.rule?.[0]?.field||c.field})))
watch(local, v=>emit('update-mapping', {...v}), {deep:true})
</script>
