<template>
  <div
    class="flex h-screen overflow-hidden transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
  >
    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <SideBar
        @close="sidebarOpen = false"
        @new-chat="handleNewChat"
        @open-user-modal="showUserModal = true"
      />
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/50 md:hidden"
      @click="sidebarOpen = false"
    />

    <!-- User Modal -->
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

    <!-- Logout Confirmation -->
    <div
      v-if="showLogoutConfirm"
      class="fixed inset-0 z-[110] flex items-center justify-center bg-black/50"
    >
      <div class="bg-white dark:bg-gray-900 rounded-lg p-6 w-96 text-center">
        <h3 class="text-lg font-semibold mb-2">Are you sure?</h3>
        <p class="text-gray-500 mb-6">Log out of PromptFlow as {{ userEmail }}?</p>

        <button
          @click="confirmLogout"
          class="w-full mb-2 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Log out
        </button>

        <button @click="showLogoutConfirm = false" class="w-full px-4 py-2 border rounded-lg">
          Cancel
        </button>
      </div>
    </div>

    <!-- Main Layout -->
    <div class="flex flex-col flex-1 h-screen">
      <!-- Header -->
      <div
        class="flex items-center justify-between gap-4 px-4 py-4 border-b border-gray-200 dark:border-gray-700 md:px-6"
      >
        <div class="flex items-center gap-4">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
          >
            <svg
              v-if="!sidebarOpen"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h1 class="text-lg font-semibold">{{ currentChatTitle }}</h1>
        </div>

        <!-- Dark/Light Toggle -->
        <button
          @click="toggleDarkMode"
          class="px-3 py-1 rounded-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transition-colors duration-300"
        >
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </button>
      </div>

      <!-- Chat Area -->
      <ChatArea :messages="messages" />

      <!-- Input -->
      <MessageInput @send-message="handleSendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ChatArea from '../chatui/ChatArea.vue'
import MessageInput from '../chatui/MessageInput.vue'
import SideBar from '../chatui/SideBar.vue'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const sidebarOpen = ref(false)
const showUserModal = ref(false)
const showLogoutConfirm = ref(false)

const userName = 'Salako muhammed Awwal'
const userEmail = 'awwalsalakomuhammed@gmail.com'

const confirmLogout = () => {
  console.log('User logged out')
  showLogoutConfirm.value = false
}

const messages = ref<Message[]>([])
const currentChatTitle = ref('Chat')
const isDark = ref(document.documentElement.classList.contains('dark'))

// Toggle dark mode
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Chat logic
const defaultResponses = [
  "That's a great question! Let me guide you through it.",
  "Interesting point! Here's what I think about that:",
  'Sure! Let me explain that in a simpler way.',
  "I'm here to help! Let's break it down:",
]

const handleSendMessage = (message: string) => {
  if (!message.trim()) return

  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content: message,
  })

  setTimeout(() => {
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: defaultResponses[Math.floor(Math.random() * defaultResponses.length)] || '',
    })
  }, 500)

  sidebarOpen.value = false
}

const handleNewChat = () => {
  messages.value = []
  currentChatTitle.value = 'New Chat'
  sidebarOpen.value = false
}
</script>
