<template>
  <div
    ref="sidebar"
    class="flex flex-col h-full bg-white dark:bg-gray-900 transition-colors duration-300 relative"
  >
    <!-- Header -->
    <div
      class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Chat History</h2>
      <button
        @click="emit('close')"
        class="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        ✕
      </button>
    </div>

    <!-- New Chat -->
    <button
      @click="emit('new-chat')"
      class="m-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
    >
      ＋ New Chat
    </button>

    <!-- Search -->
    <div class="px-4 py-2">
      <input
        v-model="searchQuery"
        placeholder="Search chats"
        class="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none"
      />
    </div>

    <!-- Chat List -->
    <div class="flex-1 overflow-y-auto px-4 py-2">
      <!-- Loading -->
      <div v-if="loading">
        <div
          v-for="n in 5"
          :key="n"
          class="animate-pulse h-10 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"
        />
      </div>

      <!-- Empty -->
      <p v-else-if="filteredChats.length === 0" class="text-center text-gray-500 mt-6">
        No chats found
      </p>

      <!-- Chats -->
      <div
        v-for="chat in filteredChats"
        :key="chat.id"
        @click="selectChat(chat)"
        class="py-2 px-3 mb-2 rounded-lg cursor-pointer flex items-center justify-between group transition-colors"
        :class="
          chat.id === activeChatId
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
        "
      >
        <p class="text-sm truncate flex-1">
          {{ chat.title }}
        </p>

        <button
          @click.stop="handleDeleteChat(chat.id)"
          class="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-black/10"
        >
          🗑️
        </button>
      </div>
    </div>

    <!-- User Profile -->
    <div
      @click="emit('open-user-modal')"
      class="p-4 border-t bg-gray-100 flex items-center gap-4 dark:bg-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <div class="h-12 w-12 flex justify-center items-center bg-blue-600 rounded-full p-4">
        {{ userInitials }}
      </div>
      <div>
        <p class="text-sm font-medium truncate">{{ userName }}</p>
        <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
      </div>
    </div>

    <!-- Resize Handle -->
    <div class="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-300 dark:bg-gray-600" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { chatService } from '@/services/api'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'
import { watch } from 'vue'

type Chat = {
  id: number
  title: string
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'new-chat'): void
  (e: 'open-user-modal'): void
  (e: 'select-chat', chat: Chat): void
  (e: 'refresh-chats'): void
}>()

const toast = useToast()
const authStore = useAuthStore()
const route = useRoute()

const chats = ref<Chat[]>([])
const searchQuery = ref('')
const loading = ref(false)

const userName = ref(authStore.user?.name ?? '')
const userEmail = ref(authStore.user?.email ?? '')

const activeChatId = computed(() => (route.params.id ? Number(route.params.id) : null))

const userInitials = computed(() => {
  if (!userName.value) return ''
  return userName.value
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
})

const filteredChats = computed(() =>
  chats.value.filter((chat) => chat.title.toLowerCase().includes(searchQuery.value.toLowerCase())),
)

const fetchChats = async () => {
  loading.value = true
  try {
    const res = await chatService.getChats()
    chats.value = res.data.data ?? []
  } catch {
    toast.error('Failed to fetch chats')
  } finally {
    loading.value = false
  }
}

/* SELECT CHAT (NO STATE MUTATION) */
const selectChat = (chat: Chat) => {
  emit('select-chat', chat)
}

/* DELETE CHAT */
const handleDeleteChat = async (chatId: number) => {
  try {
    await chatService.deleteChat(chatId)
    chats.value = chats.value.filter((c) => c.id !== chatId)

    if (activeChatId.value === chatId) {
      emit('new-chat')
    }

    toast.success('Chat deleted')
  } catch {
    toast.error('Failed to delete chat')
  }
}

onMounted(fetchChats)

watch(
  () => route.fullPath,
  () => {
    fetchChats()
  },
)
defineProps<{
  chats: Chat[]
}>()
</script>
