<template>
  <div class="home">
    <el-row class="full-height full-width">
      <!-- 侧边栏 -->
      <!-- <el-col class="list hidden-sm-and-down" :span="5">
        <el-aside class="hidden-xs-only"></el-aside>
      </el-col> -->
      <el-col :span="screenState.width">
        <el-container class="full-height full-width">
          <!-- <el-button class="toggle-sidebar hidden-sm-and-up" @click="dialogVisible = true">
            Show List
          </el-button> -->
          <el-header></el-header>
          <el-main>
            <ChatFrame
              v-for="message in ChatList.messages"
              :message="message"
              :key="message.createdAt"
            ></ChatFrame>
          </el-main>
          <el-footer>
            <el-row>
              <KeyButton />
              <ClearMessageButton />
              <ModelButton />
              <MaskButton />
            </el-row>
            <MessageInput @send="send" />
          </el-footer>
        </el-container>
      </el-col>
    </el-row>
    <!-- 在手机屏幕上显示list的对话框 -->
    <!-- <el-dialog
      title="Show List"
      v-model="dialogVisible"
      :fullscreen="true"
      class="list hidden-sm-and-up"
    >
      <el-col :span="24">
        <el-aside></el-aside>
      </el-col>
    </el-dialog> -->
  </div>
</template>

<script setup lang="ts">
import MessageInput from '@/components/MessageInput.vue'
import ChatFrame from '@/components/ChatFrame.vue'
import ModelButton from '@/components/ModelButton.vue'
import KeyButton from '@/components/KeyButton.vue'
import { ref, reactive, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { chat } from '@/services/chatgpt'
import { setMessage } from '@/utils/init'
import { useMessageContentStore, useMessageStore } from '@/store/message'
import { Role, type GPTmessage, type GPTsession, type GPTsessionContent } from '@/types'
import MaskButton from './components/MaskButton.vue'
import ClearMessageButton from './components/ClearMessageButton.vue'

const messageStore = useMessageStore()
const contentStore = useMessageContentStore()

let msg: GPTmessage

const dialogVisible = ref(false) // 控制对话框是否显示的状态
// 屏幕宽度相关变量
const screenWidth = ref(window.innerWidth)
const screenState = reactive({ width: 20 })

watchEffect(() => {
  if (screenWidth.value <= 768) {
    //如果屏幕尺寸小于或等于768px
    screenState.width = 24
  } else {
    screenState.width = 24
  }
})

onMounted(() => {
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    screenWidth.value = window.innerWidth
  })
})

//对话显示
let ChatList = ref({ messages: [] } as GPTsession)
const received = ref('')

ChatList.value = messageStore.getChatList()

// const newMask: Mask = mask.find((item) => item.createdAt === 1712412059698)!
// ChatList.value = setChatList(newMask)

//连续对话
let msgList = ref({ contents: [] } as GPTsessionContent)
msgList.value = contentStore.getContentList()

const send = async (message: any) => {
  msg = setMessage(Role.User, message)
  if (received.value != '') {
    contentStore.addMessage({ role: Role.Assistant, content: received.value })
    // msgList.value.contents.push({ role: Role.Assistant, content: received.value })
  }
  contentStore.addMessage({ role: Role.User, content: message })
  // msgList.value.contents.push({ role: Role.User, content: message })
  messageStore.addMessage(msg)
  // ChatList.value.messages.push(...[msg])
  // console.log(ChatList.value.messages)

  try {
    // 调用 chat 函数发送消息，并等待返回结果
    await chat(msg, msgList.value.contents, (receivedMessage: string) => {
      // 更新 receivedMessage 的值

      if (ChatList.value.messages.length > 0) {
        const lastMessage = messageStore.getLastMessage()
        // const lastMessage = ChatList.value.messages[ChatList.value.messages.length - 1]

        // 检查最后一条消息的role是否为'assistant'
        if (lastMessage.role === 'assistant') {
          // 如果是，则删除最后一条消息
          messageStore.deleteLastMessage()
          // ChatList.value.messages.pop()
        } else {
          received.value = ''
        }
      }
      received.value += receivedMessage
      msg = setMessage(Role.Assistant, received.value)
      messageStore.addMessage(msg)
      ChatList.value = messageStore.ChatList
      // ChatList.value.messages.push(...[msg])
      console.log('显示列表', ChatList.value)
      console.log('对话列表', msgList.value)
    })
  } catch (error) {
    console.error('Error occurred:', error) // 处理错误
  }
}
</script>

<style lang="scss" scoped>
@import './styles/App.scss';
</style>
