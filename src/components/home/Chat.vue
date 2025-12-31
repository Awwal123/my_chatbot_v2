<template>
  <div
    class="flex h-screen overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <div
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <SideBar
        :chats="chats"
        @close="sidebarOpen = false"
        @new-chat="handleNewChat"
        @open-user-modal="showUserModal = true"
        @select-chat="handleSelectChat"
      />
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 md:hidden"
      @click="sidebarOpen = false"
    />

    <div
      v-if="showUserModal"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
      @click="showUserModal = false"
    >
      <div class="bg-white dark:bg-gray-900 rounded-lg p-6 w-80 shadow-xl" @click.stop>
        <p class="font-medium mb-1">{{ userName }}</p>
        <p class="text-sm text-gray-500 mb-6">{{ userEmail }}</p>

        <button
          @click="
            () => {
              showUserModal = false
              showLogoutConfirm = true
            }
          "
          class="w-full px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Log out
        </button>

        <button
          @click="showUserModal = false"
          class="w-full mt-2 px-4 py-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>

    <div
      v-if="showLogoutConfirm"
      class="fixed inset-0 z-[110] flex items-center justify-center bg-black/50"
    >
      <div class="bg-white dark:bg-gray-900 rounded-lg p-6 w-96 text-center">
        <h3 class="text-lg font-semibold mb-2">Are you sure?</h3>
        <p class="text-gray-500 mb-6">Log out of PromptFlow as {{ userEmail }}?</p>

        <button
          @click="confirmLogout"
          :disabled="isLoggingOut"
          class="w-full px-4 py-2 mb-5 bg-red-600 text-white rounded-lg disabled:opacity-50"
        >
          <span v-if="isLoggingOut">Logging out...</span>
          <span v-else>Log out</span>
        </button>

        <button @click="showLogoutConfirm = false" class="w-full px-4 py-2 border rounded-lg">
          Cancel
        </button>
      </div>
    </div>

    <!-- Main Layout -->
    <div class="flex flex-col flex-1 h-screen">
      <div
        class="flex items-center justify-between gap-4 px-4 py-4 border-b border-gray-200 dark:border-gray-700 md:px-6"
      >
        <div class="flex items-center gap-4">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            ☰
          </button>

          <!-- <h1 class="text-lg font-semibold">{{ currentChatTitle }}</h1> -->
          <h1 class="text-lg font-semibold">PromptFlow</h1>
        </div>

        <button
          @click="toggleDarkMode"
          class="px-3 py-1 rounded-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        >
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </button>
      </div>

      <ChatArea :messages="messages" :loading="isChatLoading" />

      <MessageInput :disabled="isAiLoading" @send-message="handleSendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { authService, chatService } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

import ChatArea from '../chatui/ChatArea.vue'
import MessageInput from '../chatui/MessageInput.vue'
import SideBar from '../chatui/SideBar.vue'

type Chat = { id: number; title: string }

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const router = useRouter()
const route = useRoute()
const toast = useToast()
const authStore = useAuthStore()
const sidebarOpen = ref(false)
const showUserModal = ref(false)
const showLogoutConfirm = ref(false)
const isLoggingOut = ref(false)
const isAiLoading = ref(false)
const isChatLoading = ref(false)

const chats = ref<Chat[]>([])
const messages = ref<Message[]>([])
const currentChatId = ref<number | null>(null)
const currentChatTitle = ref('New Chat')
const userName = authStore.user?.name ?? ''
const userEmail = authStore.user?.email ?? ''

const isDark = ref(document.documentElement.classList.contains('dark'))
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

const refreshChats = async () => {
  const res = await chatService.getChats()
  chats.value = res.data.data ?? []
}

const loadChatById = async (id: number) => {
  if (currentChatId.value === id) return

  isChatLoading.value = true
  currentChatId.value = id
  messages.value = []

  try {
    const res = await chatService.getMessages(id)

    messages.value = res.data.data
      .sort((a: any, b: any) => a.id - b.id)
      .map((m: any) => ({
        id: m.id.toString(),
        role: m.type === 'assistant' ? 'assistant' : 'user',
        content: m.message,
      }))

    const chat = chats.value.find((c) => c.id === id)
    if (chat) currentChatTitle.value = chat.title
  } catch {
    toast.error('Failed to load chat')
  } finally {
    isChatLoading.value = false
  }
}

const handleSelectChat = (chat: Chat) => {
  sidebarOpen.value = false
  router.push(`/chat/${chat.id}`)
}

const handleNewChat = () => {
  router.push('/chat')
  currentChatId.value = null
  currentChatTitle.value = 'New Chat'
  messages.value = []
  sidebarOpen.value = false
}

const handleSendMessage = async (content: string) => {
  if (!content.trim() || isAiLoading.value) return
  isAiLoading.value = true

  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content,
  })

  const typingId = `typing-${Date.now()}`
  messages.value.push({
    id: typingId,
    role: 'assistant',
    content: 'AI is typing…',
  })

  try {
    if (!currentChatId.value) {
      const res = await chatService.createChat({ title: content })
      await refreshChats()
      router.replace(`/chat/${res.data.data.id}`)
      currentChatId.value = res.data.data.id
      currentChatTitle.value = res.data.data.title
    }

    const res = await chatService.sendMessage(currentChatId.value!, {
      message: content,
    })

    messages.value = messages.value.filter((m) => m.id !== typingId)
    messages.value.push({
      id: res.data.data.ai_message.id.toString(),
      role: 'assistant',
      content: res.data.data.ai_message.message,
    })
  } finally {
    isAiLoading.value = false
  }
}

const confirmLogout = async () => {
  if (isLoggingOut.value) return
  isLoggingOut.value = true

  try {
    await authService.logoutUser()
  } finally {
    authStore.logout()
    router.push('/auth/signin')
    isLoggingOut.value = false
    showLogoutConfirm.value = false
  }
}

onMounted(async () => {
  await refreshChats()
  const id = Number(route.params.id)
  if (id) loadChatById(id)
})

watch(
  () => route.params.id,
  (id) => {
    if (id) loadChatById(Number(id))
    else {
      currentChatId.value = null
      currentChatTitle.value = 'New Chat'
      messages.value = []
    }
  },
)
</script>
