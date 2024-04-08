<template>
  <el-button type="primary" circle @click="handleCommand" :size="buttonSize">
    <el-icon><Delete /></el-icon>
  </el-button>
</template>

<script setup lang="ts">
import { ElButton, ElIcon, ElMessage } from 'element-plus'
import { useMessageContentStore, useMessageStore } from '@/store/message'
import { onMounted, onUnmounted, ref } from 'vue'

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

const messageStore = useMessageStore()
const contentStore = useMessageContentStore()

const handleCommand = () => {
  const msg = '对话历史已清除'
  contentStore.clearMessages()
  messageStore.clearMessages()
  ElMessage({
    message: msg,
    type: 'success'
  })
}
</script>
