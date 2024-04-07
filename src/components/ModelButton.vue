<template>
  <el-dropdown @command="handleCommand" size="large" placement="top" trigger="click" max-height = "300px">
    <el-button type="primary" circle>
      <el-icon><Minus /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in model" :key="item.createdAt" :command="item.content">
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElButton,
  ElIcon,
  ElMessage
} from 'element-plus'
import { useOpenaiStore } from '../store/openai'
import { model } from '../store/model'

const openaiStore = useOpenaiStore()

const handleCommand = (command: string) => {
  const msg = '已选择' + command + '模型'
  openaiStore.OPENAI_MODEL = command
  console.log(msg)
  ElMessage({
    message: msg,
    type: 'success'
  })
}
</script>
