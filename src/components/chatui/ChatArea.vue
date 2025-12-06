<template>
  <div ref="messagesContainer" class="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-4 flex flex-col bg-white dark:bg-gray-800 transition-colors duration-300">
    <div v-if="messages.length === 0" class="flex items-center justify-center h-full">
      <p class="text-gray-500 dark:text-gray-400 text-lg">Start a conversation</p>
    </div>

    <div v-for="msg in messages" :key="msg.id" :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
      <div
        :class="[
          'max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg',
          msg.role === 'user' ? 'bg-blue-600 text-white rounded-2xl' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-2xl'
        ]"
      >
        <p class="text-sm md:text-base">{{ msg.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const props = defineProps<{ messages: Message[] }>()
const messagesContainer = ref<HTMLElement | null>(null)

watch(
  () => props.messages.length,
  async () => {
    await nextTick()
    if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
)
</script>
