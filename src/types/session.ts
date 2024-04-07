export type GPTsession = {
  messages: GPTmessage[]
}
export type GPTmessage = {
  createdAt: number
  role: Role
  model: string
  content: string
}
export type GPTsessionContent = {
  contents: GPTmessageContent[]
}
export type GPTmessageContent = {
  role: Role
  content: string
}
export enum Role {
  User = 'user',
  System = 'system',
  Assistant = 'assistant'
}
