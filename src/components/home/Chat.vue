<template>
  <div class="flex h-screen bg-background">
    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 bg-white border-r border-gray-200',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <Sidebar @close="sidebarOpen = false" @new-chat="handleNewChat" />
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 md:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Main Chat Area -->
    <div class="flex flex-col flex-1 w-full h-screen">
      <!-- Header -->
      <div class="flex items-center gap-4 px-4 py-3 border-b border-gray-200 md:px-6">
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="md:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <svg v-if="!sidebarOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 class="text-lg font-semibold text-gray-900">{{ currentChatTitle }}</h1>
      </div>

      <!-- Chat Messages - grows to fill space -->
      <ChatArea :messages="messages" />

      <!-- Message Input - fixed at bottom -->
      <MessageInput @send-message="handleSendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Chatarea from '../chatui/ChatArea.vue'
import MessageInput from '../chatui/MessageInput.vue'
import SideBar from '../chatui/SideBar.vue'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const sidebarOpen = ref(false)
const messages = ref<Message[]>([])
const currentChatTitle = ref('Chat')

const defaultResponses = [
  "That's a great question! Let me help you with that. You'll need to break this down into steps and follow the process carefully.",
  "Interesting! First, let me explain the basics. The key here is to understand the fundamental concepts before diving deeper.",
  "I can definitely help with that. Here's what you should do: Start by gathering all the necessary information, then organize it logically.",
  "That's an important point. The solution involves several key components working together in harmony.",
]

const handleSendMessage = (message: string) => {
  console.log("[v0] Sending message:", message)
  if (!message.trim()) return

  // Add user message
  const userMessage: Message = {
    id: Date.now().toString(),
    role: 'user',
    content: message,
  }

  messages.value.push(userMessage)
  console.log("[v0] User message added, total messages:", messages.value.length)

  // Simulate default assistant response
  setTimeout(() => {
    const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)] || "I'm here to help! What would you like to know?"

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: randomResponse,
    }

    messages.value.push(assistantMessage)
    console.log("[v0] Assistant response added")
  }, 500)

  // Close sidebar on mobile after sending
  sidebarOpen.value = false
}

const handleNewChat = () => {
  messages.value = []
  currentChatTitle.value = 'Chat'
  sidebarOpen.value = false
}
</script>
