<script lang="ts" setup>
// import { PropType } from 'vue'
import { type GPTmessage } from '../types'
import { formatDateTime } from '../utils/formetTime'
import { computed } from 'vue'
const a: string = '../../public/patrick1.png'
const b: string = '../../public/cat.png'
const props = defineProps<{
  message: GPTmessage
}>()

const processedContent = computed(() => {
  const content = props.message.content

  // Check if 'http' or 'https' is in the string
  if ((content.includes('http') || content.includes('https')) && content.includes(' ')) {
    return content.replace(/ /g, '%20')
  }

  return content
})
</script>

<template>
  <div
    v-if="['user', 'assistant'].includes(message.role)"
    :class="['message-row', message.role === 'user' ? 'right' : 'left']"
  >
    <div class="timestamp">
      {{ formatDateTime(message.createdAt) }}
    </div>

    <div class="row">
      <!-- 用户或助手的头像 -->
      <div class="avatar-wrapper">
        <el-avatar
            v-if="message.role === 'user'"
            :src="a"
            class="avatar"
            shape="circle"
            size="default"
        />
        <el-avatar v-else :src="b" class="avatar" shape="circle" size="default" />
      </div>

      <!-- 消息内容 -->
      <div class="message">
        <MdPreview
            :id="'preview-only'"
            :preview-theme="'default'"
            :model-value="processedContent"
            :showCodeRowNumber="true"
             :style="{
               backgroundColor: message.role === 'user' ? 'rgb(231, 248, 255)' : '#f4f4f5'
             }"
             v-if="processedContent"
        ></MdPreview>
        <ChatLoading v-else></ChatLoading>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/ChatFrame';
</style>
