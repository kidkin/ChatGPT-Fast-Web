import type { GPTmessageContent } from "."

export type Mask = {
  createdAt: number
  avatar: string
  name: string
  context: GPTmessageContent[]
}
