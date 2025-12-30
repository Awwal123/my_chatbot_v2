import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Array<{ id: string; title: string }>>([])

  function addChatOptimistically(newChat: { id: string; title: string }) {
    chats.value.unshift(newChat) 
  }

  function replaceChatId(tempId: string, realId: string) {
    const chat = chats.value.find(c => c.id === tempId)
    if (chat) chat.id = realId
  }

  return { chats, addChatOptimistically, replaceChatId }
})
