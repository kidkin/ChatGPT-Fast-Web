import { defineStore } from 'pinia'

export const useCreatedAtStore = defineStore({
  id: 'createdAtStore',
  state: () => ({
    createdAt:0
  }),
  actions: {
    setCreatedAt(newValue: number) {
      this.createdAt = newValue
    },
    getCreatedAt() {
      return this.createdAt
    },
  }
})
