<template>
  <el-dialog v-model="visible" :title="title" width="800px" :close-on-click-modal="false">
    <el-steps :active="step" finish-status="success" simple class="mb-3">
      <el-step title="选择EXCEL表" />
      <el-step title="数据预览" />
      <el-step title="导入设置" />
      <el-step title="导入数据" />
    </el-steps>

    <component :is="currentComp" v-bind="stepProps" @select-file="onFile" @update-mapping="onMap" />

    <template #footer>
      <el-button @click="visible=false">取消</el-button>
      <el-button v-if="step>0" @click="prev">上一步</el-button>
      <el-button v-if="step<3" type="primary" :disabled="!canNext" @click="next">下一步</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { readExcel } from '@form-create/utils'
import StepSelectFile from './steps/StepSelectFile.vue'
import StepPreviewData from './steps/StepPreviewData.vue'
import StepImportSettings from './steps/StepImportSettings.vue'
import StepImportData from './steps/StepImportData.vue'

const props = defineProps({
  modelValue: Boolean,
  columns: Array,
  tableTitle: String,
  onImport: Function
})
const emit = defineEmits(['update:modelValue','imported'])

const visible = computed({
  get:()=>props.modelValue,
  set:v=>emit('update:modelValue',v)
})

const title = computed(()=>'批量导入'+(props.tableTitle||''))
const step = ref(0)
const file = ref(null)
const data = ref([])
const mapping = ref({})
const status = ref('idle')

const currentComp = computed(()=>[
  StepSelectFile,
  StepPreviewData,
  StepImportSettings,
  StepImportData
][step.value])

const stepProps = computed(()=>({
  excelData:data.value,
  columns:props.columns,
  columnMapping:mapping.value,
  status:status.value
}))

function prev(){ if(step.value>0) step.value-- }

async function next(){
  if(step.value===2){
    status.value='importing'
    if(props.onImport){
      await props.onImport(data.value)
    }
    status.value='success'
  }
  if(step.value<3) step.value++
}

const canNext = computed(()=>{
  if(step.value===0) return !!file.value
  if(step.value===1) return data.value.length>0
  if(step.value===2) return Object.keys(mapping.value).length>0
  return true
})

async function onFile(f){
  file.value=f
  data.value=await readExcel(f)
}
function onMap(m){ mapping.value=m }
</script>
