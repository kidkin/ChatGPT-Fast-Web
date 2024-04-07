import type { GPTmessage, GPTmessageContent, GPTsession, GPTsessionContent } from '@/types'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore({
  id: 'messageStore',
  state: () => ({
    ChatList: { messages: [] } as GPTsession
  }),
  actions: {
    // 添加消息到 ChatList
    addMessage(message: GPTmessage) {
      this.ChatList.messages.push(message)
    },
    addMessages(messages: GPTmessage[]) {
      this.ChatList.messages.push(...messages)
    },
    // 删除 ChatList 中的消息
    deleteMessage(messageId: number) {
      const index = this.ChatList.messages.findIndex((msg) => msg.createdAt === messageId)
      if (index !== -1) {
        this.ChatList.messages.splice(index, 1)
      }
    },

    // 更新 ChatList 中的消息
    updateMessage(messageId: number, newContent: string) {
      const index = this.ChatList.messages.findIndex((msg) => msg.createdAt === messageId)
      if (index !== -1) {
        this.ChatList.messages[index].content = newContent
      }
    },

    // 清空所有消息
    clearMessages() {
      this.ChatList.messages = []
    },

    // 删除最后一个消息
    deleteLastMessage() {
      this.ChatList.messages.pop()
    },
    // 获取最后一个消息
    getLastMessage() {
      return this.ChatList.messages[this.ChatList.messages.length - 1]
    },
    // 获取 ChatList
    getChatList() {
      return this.ChatList
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

    // // 删除 ContentList 中的消息
    // deleteMessage(messageId: number) {
    //   const index = this.ContentList.messages.findIndex(msg => msg.createdAt === messageId);
    //   if (index !== -1) {
    //     this.ContentList.messages.splice(index, 1);
    //   }
    // },

    // // 更新 ContentList 中的消息
    // updateMessage(messageId: number, newContent: string) {
    //   const index = this.ContentList.messages.findIndex(msg => msg.createdAt === messageId);
    //   if (index !== -1) {
    //     this.ContentList.messages[index].content = newContent;
    //   }
    // },

    // 清空所有消息
    clearMessages() {
      this.ContentList.contents = []
    },

    // // 删除最后一个消息
    // deleteLastMessage() {
    //   this.ContentList.messages.pop();
    // },

    // // 获取最后一个消息
    // getLastMessage() {
    //    return this.ContentList.messages[this.ContentList.messages.length - 1];
    // },

    // 获取 ContentList
    getContentList() {
      return this.ContentList
    }
  }
})
