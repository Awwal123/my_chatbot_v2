<template>
  <div class="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-4 flex flex-col">
    <div v-if="messages.length === 0" class="flex items-center justify-center h-full">
      <div class="text-center">
        <p class="text-gray-500 text-lg">Start a conversation</p>
      </div>
    </div>

    <div v-for="msg in messages" :key="msg.id" :class="[
      'flex',
      msg.role === 'user' ? 'justify-end' : 'justify-start'
    ]">
      <div :class="[
        'max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg',
        msg.role === 'user'
          ? 'bg-blue-600 text-white rounded-full'
          : 'bg-gray-100 text-gray-900'
      ]">
        <p class="text-sm md:text-base">{{ msg.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

defineProps<{
  messages: Message[]
}>()
</script>
