export type Model = {
  createdAt: number
  name: string
  content: string
  provider: Provider
}
export enum Provider {
  openai = 'openai'
}
