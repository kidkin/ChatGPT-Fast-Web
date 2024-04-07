import { defineStore } from 'pinia'

export const useOpenaiStore = defineStore({
  id: 'openaiStore',
  state: () => ({
    OPENAI_BASE_URL: 'https://api.openai.com/v1',
    OPENAI_API_KEY: 'sk-apikey',
    OPENAI_MODEL: 'gpt-3.5-turbo',
    OPENAI_STREAM: true
  }),
  actions: {
    setOpenaiBaseUrl(newValue: string) {
      this.OPENAI_BASE_URL = newValue
    },
    setOpenaiApiKey(newValue: string) {
      this.OPENAI_API_KEY = newValue
    },
    setOpenaiModel(newValue: string) {
      this.OPENAI_MODEL = newValue
    },
    setOpenaiStream(newValue: boolean) {
      this.OPENAI_STREAM = newValue
    }
  }
})
