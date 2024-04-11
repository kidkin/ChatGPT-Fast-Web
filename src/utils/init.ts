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

function isMask(arg: Mask | GPTsession): arg is Mask {
  return (arg as Mask).context !== undefined;
}

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

export function setMessageList(arg: Mask | GPTsession): GPTsessionContent {
  const session: GPTsessionContent = {
    contents: []
  }
  if(isMask(arg)){
    const mask = arg as Mask;
    for (const message of mask.context) {
      const msg: GPTmessageContent = {
        role: message.role,
        content: message.content
      }
      session.contents.push(msg)
    }
  }
  else{
    const gptsession = arg as GPTsession
    for(const message of gptsession.messages){
      const msg: GPTmessageContent = {
        role: message.role,
        content: message.content
      }
      session.contents.push(msg)
    }
  }
  return session
}


