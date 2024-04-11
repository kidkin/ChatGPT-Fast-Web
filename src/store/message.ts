import {
  type GPTmessage,
  type GPTmessageContent,
  type GPTsession,
  type GPTsessionContent,
  type ChatList,
  Role
} from '@/types'
import { defineStore } from 'pinia'
import { useCreatedAtStore } from './id'

export const useChatListStore = defineStore({
  id: 'chatListStore',
  state: () => ({
    ChatLists: [
      // {
      //   createdAt: 1650000000,
      //   name: 'ChatList A',
      //   Chat: {
      //     messages: [
      //       {
      //         createdAt: 1650000010,
      //         role: Role.User,
      //         model: 'Model A',
      //         content: 'This is a message from user in ChatList A.'
      //       },
      //       {
      //         createdAt: 1650000020,
      //         role: Role.Assistant,
      //         model: 'Model A',
      //         content: 'This is a reply from the assistant in ChatList A.'
      //       }
      //     ]
      //   }
      // },
      // {
      //   createdAt: 1650000100,
      //   name: 'ChatList B',
      //   Chat: {
      //     messages: [
      //       {
      //         createdAt: 1650000110,
      //         role: Role.User,
      //         model: 'Model B',
      //         content: "User's message in ChatList B."
      //       },
      //       {
      //         createdAt: 1650000120,
      //         role: Role.Assistant,
      //         model: 'Model B',
      //         content: "Assistant's response in ChatList B."
      //       }
      //     ]
      //   }
      // },
      // {
      //   createdAt: 1650000200,
      //   name: 'ChatList C',
      //   Chat: {
      //     messages: [
      //       {
      //         createdAt: 1650000210,
      //         role: Role.User,
      //         model: 'Model C',
      //         content: 'Hello from ChatList C user.'
      //       },
      //       {
      //         createdAt: 1650000220,
      //         role: Role.Assistant,
      //         model: 'Model C',
      //         content: 'Greetings from the assistant in ChatList C.'
      //       }
      //     ]
      //   }
      // }
    ] as ChatList[]
  }),
  actions: {
    findChatListByCreatedAt(createdAt: number) {
      const index = this.ChatLists.findIndex((item) => item.createdAt === createdAt)
      console.log('find', index, createdAt)
      if (index !== -1) {
        return this.ChatLists[index]
      } else {
        this.ChatLists.push({
          createdAt: createdAt,
          name: '新建聊天1',
          Chat: {
            messages: []
          }
        })
        return this.ChatLists.find((chatList) => chatList.createdAt === createdAt)
      }
    },
    syncChatList(createdAt: number, session: GPTsession) {
      const index = this.ChatLists.findIndex((item) => item.createdAt === createdAt)
      console.log('同步', index, createdAt)
      if (index !== -1) {
        this.ChatLists[index].Chat.messages = session.messages
      } else {
        const createdAtStore = useCreatedAtStore()
        createdAtStore.setCreatedAt(Date.now())
        this.ChatLists.push({
          createdAt: createdAtStore.getCreatedAt(),
          name: '新建聊天',
          Chat: {
            messages: session.messages
          }
        })
      }
    }
  }
})

export const useMessageStore = defineStore({
  id: 'messageStore',
  state: () => ({
    MessageList: { messages: [] } as GPTsession
  }),
  actions: {
    // 初始化MessageList方法
    initMessageList(createdAt: number) {
      const chatListStore = useChatListStore()
      const chatList = chatListStore.findChatListByCreatedAt(createdAt)
      if (chatList) {
        this.MessageList = chatList.Chat
        // console.log(this.MessageList)
      }
    },

    // 同步当前MessageList到ChatList数组中
    // syncChatList() {
    //   const chatListStore = useChatListStore()
    //   const index = chatListStore.ChatLists.findIndex((item) => item.createdAt === this.MessageList.createdAt)
    //   const newChatList: ChatList = {
    //     createdAt: this.MessageList.createdAt, // 这里假设 MessageList 已经有 createdAt 属性
    //     name: 'New ChatList', // 根据你的需要，这里可能需要一个更复杂的逻辑来确定name
    //     Chat: this.MessageList
    //   }
    //   if (index !== -1) {
    //     chatListStore.ChatLists[index] = newChatList
    //   } else {
    //     chatListStore.ChatLists.push(newChatList)
    //   }
    // },
    // 添加消息到 MessageList
    addMessage(message: GPTmessage) {
      this.MessageList.messages.push(message)
    },
    addMessages(messages: GPTmessage[]) {
      this.MessageList.messages.push(...messages)
    },
    // 删除 MessageList 中的消息
    deleteMessage(messageId: number) {
      const index = this.MessageList.messages.findIndex((msg) => msg.createdAt === messageId)
      if (index !== -1) {
        this.MessageList.messages.splice(index, 1)
      }
    },

    // 更新 MessageList 中的消息
    updateMessage(messageId: number, newContent: string) {
      const index = this.MessageList.messages.findIndex((msg) => msg.createdAt === messageId)
      if (index !== -1) {
        this.MessageList.messages[index].content = newContent
      }
    },

    // 清空所有消息
    clearMessages() {
      this.MessageList.messages = []
    },

    // 删除最后一个消息
    deleteLastMessage() {
      this.MessageList.messages.pop()
    },
    // 获取最后一个消息
    getLastMessage() {
      return this.MessageList.messages[this.MessageList.messages.length - 1]
    },
    // 获取 MessageList
    getMessageList() {
      return this.MessageList
    }
  }
})

export const useMessageContentStore = defineStore({
  id: 'messageContentStore',
  state: () => ({
    ContentList: { contents: [] } as GPTsessionContent
  }),
  actions: {
    // 添加消息到 ContentList
    addMessage(message: GPTmessageContent) {
      this.ContentList.contents.push(message)
    },

    // 添加消息到 ContentList
    addMessages(message: GPTmessageContent[]) {
      this.ContentList.contents.push(...message)
    },
    addMessages1(message: GPTsessionContent) {
      for (const msg of message.contents) {
        this.ContentList.contents.push(msg)
      }
    },

    // 清空所有消息
    clearMessages() {
      this.ContentList.contents = []
    },

    // 获取 ContentList
    getContentList() {
      return this.ContentList
    }
  }
})
