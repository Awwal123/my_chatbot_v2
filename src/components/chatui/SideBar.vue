<template>
  <div class="flex flex-col h-full bg-white">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <h2 class="text-xl font-bold text-gray-900">Chat History</h2>
      <button
        @click="$emit('close')"
        class="md:hidden p-1 hover:bg-gray-100 rounded-lg"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- New Chat Button -->
    <button 
      @click="$emit('new-chat')"
      class="m-4 w-[calc(100%-32px)] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
    >
      + New Chat
    </button>

    <!-- Chat History List -->
    <div class="flex-1 overflow-y-auto px-4 py-2">
      <div v-for="i in 5" :key="i" class="py-2 px-3 mb-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
        <p class="text-sm text-gray-700 truncate">Chat {{ i }}</p>
        <p class="text-xs text-gray-500">Today</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['close', 'new-chat'])
</script>
