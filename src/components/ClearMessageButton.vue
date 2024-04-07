<template>
  <el-button type="primary" circle @click="handleCommand">
    <el-icon><Delete /></el-icon>
  </el-button>
</template>

<script setup lang="ts">
import { ElButton, ElIcon, ElMessage } from 'element-plus'
import { useMessageContentStore, useMessageStore } from '@/store/message'

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
