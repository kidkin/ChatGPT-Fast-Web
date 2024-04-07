import { useOpenaiStore } from '../store/openai'
import { Role, type Mask, type GPTmessage, type GPTsession, type GPTsessionContent, type GPTmessageContent } from '@/types'

export function setMessage(role: Role, content: string): GPTmessage {
  const openaiStore = useOpenaiStore()
  const timestamp = Date.now()
  const message: GPTmessage = {
    createdAt: timestamp,
    role: role,
    model: openaiStore.OPENAI_MODEL,
    content: content
  }
  return message
}

// id: number
// role: Role
// model: string
// content: string

export function setChatList(mask: Mask): GPTsession {
  const openaiStore = useOpenaiStore()
  const session: GPTsession = {
    messages: []
  }
  for (const message of mask.context) {
    const timestamp = Date.now()
    const msg: GPTmessage = {
      createdAt: timestamp,
      role: message.role,
      model: openaiStore.OPENAI_MODEL,
      content: message.content
    }
    session.messages.push(msg) // 将新创建的消息对象添加到 messages 数组中
  }
  return session
}

export function setMessageList(mask: Mask): GPTsessionContent {
  const session: GPTsessionContent = {
    contents: []
  }
  for (const message of mask.context) {
    const msg: GPTmessageContent = {
      role: message.role,
      content: message.content
    }
    session.contents.push(msg)
  }
  return session
}
