<template>
  <el-dropdown
    @command="handleCommand"
    size="large"
    placement="top"
    trigger="click"
    max-height="300px"
  >
    <el-button plain type="primary" circle :size="buttonSize">
      <el-icon><UserFilled /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in mask" :key="item.createdAt" :command="item.createdAt">
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
import { useMessageContentStore, useMessageStore } from '@/store/message'
import type { Mask } from '@/types'
import { mask } from '@/store/mask'
import { setChatList, setMessageList } from '@/utils/init'
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

const handleCommand = (command: number) => {
  const msg = '已选择' + command + '模型'
  let createdAt = Number(command)
  const newMask: Mask = mask.find((item) => item.createdAt === createdAt)!
  //   console.log(newMask)
  messageStore.clearMessages()
  messageStore.addMessages(setChatList(newMask).messages)
  contentStore.clearMessages()
  contentStore.addMessages(setMessageList(newMask).contents)
  console.log(msg)
  ElMessage({
    message: msg,
    type: 'success'
  })
}
</script>
