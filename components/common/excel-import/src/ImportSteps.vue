<template>
  <el-dialog v-model="show" title="Import Excel" width="600px">
    <el-steps :active="step" simple>
      <el-step title="Select" />
      <el-step title="Preview" />
      <el-step title="Map" />
      <el-step title="Import" />
    </el-steps>
    <div class="body">
      <StepSelectFile v-if="step===0" @select-file="loadFile" />
      <StepPreviewData v-if="step===1" :data="excelRows" />
      <StepImportSettings v-if="step===2" :data="excelRows" :fields="fields" :map="mapping" @update-map="v=>mapping=v" />
      <StepImportData v-if="step===3" :status="status" :total="excelRows.length" :success="success" />
    </div>
    <template #footer>
      <el-button @click="close">Cancel</el-button>
      <el-button v-if="step>0" @click="step--">Prev</el-button>
      <el-button v-if="step<3" type="primary" :disabled="!canNext" @click="next">Next</el-button>
      <el-button v-if="step===3" type="primary" @click="close">Done</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import XLSX from 'xlsx'
import StepSelectFile from './StepSelectFile.vue'
import StepPreviewData from './StepPreviewData.vue'
import StepImportSettings from './StepImportSettings.vue'
import StepImportData from './StepImportData.vue'

const props = defineProps({
  modelValue: Boolean,
  fields: Array
})
const emit = defineEmits(['update:modelValue','import'])
const show = computed({get:()=>props.modelValue,set:v=>emit('update:modelValue',v)})
const step = ref(0)
const excelRows = ref([])
const mapping = ref({})
const status = ref('idle')
const success = ref(0)

function close(){emit('update:modelValue',false)}
const canNext = computed(()=>{
  if(step.value===0) return excelRows.value.length>0
  if(step.value===2) return Object.keys(mapping.value).length>0
  return true
})
function next(){
  if(step.value===2){
    status.value='importing'
    emit('import', excelRows.value.map(r=>{
      const obj={};
      Object.keys(mapping.value).forEach(k=>{obj[mapping.value[k]]=r[k]})
      return obj
    }))
    success.value=excelRows.value.length
    status.value='success'
  }
  step.value++
}
async function loadFile(file){
  const buf = await file.arrayBuffer()
  const wb = XLSX.read(new Uint8Array(buf),{type:'array'})
  const sheet = wb.SheetNames[0]
  excelRows.value = XLSX.utils.sheet_to_json(wb.Sheets[sheet],{defval:''})
  step.value=1
}
</script>

<style scoped>
.body{margin:20px 0}
</style>
