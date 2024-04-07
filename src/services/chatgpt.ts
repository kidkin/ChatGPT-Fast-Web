import OpenAI from 'openai'
import * as type from '../types'
import { useOpenaiStore } from '../store/openai'


export async function chat(
  message: type.GPTmessage,
  messageList: type.GPTmessageContent[],
  onMessageReceived: (message: string) => void
): Promise<void> {
  const openaiStore = useOpenaiStore()
  const apiKey = openaiStore.OPENAI_API_KEY
  const baseURL = openaiStore.OPENAI_BASE_URL
  const openai = new OpenAI({
    baseURL,
    apiKey,
    dangerouslyAllowBrowser: true
  })
  // console.log(message)
  const stream = await openai.chat.completions.create({
    model: message.model,
    messages: messageList,
    stream: true
  })

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '' // 获取 chunk 内容
    // console.log(content)
    onMessageReceived(content) // 调用回调函数，将内容传递给前端
  }
}
