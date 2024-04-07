<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits<{
  send: [message: string]
}>()

const message = ref('')
const sendMessage = (event: { preventDefault: () => void }) => {
  event.preventDefault()
  emit('send', message.value)
  message.value = ''
}
const insertNewLine = () => {
  message.value += '\n'
}
</script>

<template>
  <div class="message_input">
    <div class="input">
      <el-input
        v-model="message"
        placeholder="Please input"
        :autosize="{ minRows: 3, maxRows: 3 }"
        class="input"
        resize="none"
        type="textarea"
        style="width: 100%"
        @keydown.enter.shift.prevent="insertNewLine"
        @keydown.enter.prevent="sendMessage"
      >
      </el-input>
      <div class="button">
        <el-button type="primary" @click="sendMessage"> 发送 </el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/MessageInput';
</style>
