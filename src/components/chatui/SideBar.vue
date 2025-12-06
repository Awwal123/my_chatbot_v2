<template>
  <div class="flex flex-col h-full bg-white dark:bg-gray-900 transition-colors duration-300">
    <div
      class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Chat History</h2>
      <button
        @click="$emit('close')"
        class="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <!-- SVG X icon -->
      </button>
    </div>

    <button
      @click="$emit('new-chat')"
      class="m-4 w-[calc(100%-32px)] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
    >
      + New Chat
    </button>

    <div class="flex-1 overflow-y-auto px-4 py-2">
      <div
        v-for="i in 5"
        :key="i"
        class="py-2 px-3 mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <p class="text-sm text-gray-700 dark:text-gray-100 truncate">Chat {{ i }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-300">Today</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['close', 'new-chat'])
</script>
