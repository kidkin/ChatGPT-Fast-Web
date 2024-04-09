<template>
  <el-button plain @click="dialogFormVisible = true " type="primary" circle :size="buttonSize"
    ><el-icon><Key /></el-icon
  ></el-button>
  <el-dialog v-model="dialogFormVisible" title="" width="500" append-to-body="true" size="small">
    <el-form :model="form" label-position="top">
      <el-form-item label="BASE URL">
        <el-input
          v-model="form.BASE_URL"
          autocomplete="off"
          placeholder="默认https://api.openai.com/v1"
        />
      </el-form-item>
      <el-form-item label="API KEY">
        <el-input v-model="form.API_KEY" autocomplete="off" placeholder="请输入你的OpenAIkey" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="update"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, reactive, ref } from 'vue'
import { useOpenaiStore } from '../store/openai'

//按钮大小
const buttonSize = ref<'default' | 'small'>('default')
const updateSize = () => {
  buttonSize.value = window.innerWidth <= 768 ? 'small' : 'default'
}
onMounted(() => {
  window.addEventListener('resize', updateSize)
  updateSize()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

const dialogFormVisible = ref(false)
const openaiStore = useOpenaiStore()
const form = reactive({
  BASE_URL: '',
  API_KEY: ''
})
const update = () => {
  openaiStore.setOpenaiBaseUrl(form.BASE_URL)
  openaiStore.setOpenaiApiKey(form.API_KEY)
  dialogFormVisible.value = false
}
</script>

<style>
@media only screen and (max-width: 600px) {
  .el-dialog {
    width: 80% !important;
  }
}
</style>
