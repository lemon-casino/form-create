<template>
  <div class="result" v-if="status==='success'">Imported {{ success }} of {{ total }}</div>
  <div v-else-if="status==='error'" class="result">Import failed</div>
  <div v-else-if="status==='importing'" class="result">Importing...</div>
</template>

<script setup>
const props = defineProps({
  status: String,
  total: Number,
  success: Number
})
</script>

<style scoped>
.result{padding:20px;text-align:center;}
</style>
