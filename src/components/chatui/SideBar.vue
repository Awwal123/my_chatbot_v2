<template>
  <div
    ref="sidebar"
    class="flex flex-col h-full bg-white dark:bg-gray-900 transition-colors duration-300 relative"
    :style="{ width: sidebarWidth + 'px' }"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
        Chat History
      </h2>

      <button
        @click="$emit('close')"
        class="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <svg
          class="w-5 h-5 text-gray-900 dark:text-gray-100"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- New Chat -->
    <button
      @click="$emit('new-chat')"
      class="m-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      New Chat
    </button>

    <!-- Search -->
    <div class="px-4 py-2">
      <div class="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <svg
          class="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search chats"
          class="bg-transparent text-gray-900 dark:text-gray-100 text-sm flex-1 outline-none placeholder-gray-500"
        />
      </div>
    </div>

    <!-- Chat List -->
    <div class="flex-1 overflow-y-auto px-4 py-2">
      <div
        v-for="(chat, i) in chats"
        :key="i"
        class="py-2 px-3 mb-2 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer
               hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
               group flex items-center justify-between"
      >
        <p class="text-sm text-gray-900 dark:text-gray-100 truncate flex-1">
          {{ chat }}
        </p>

        <button
          @click.stop="deleteChat(i)"
          class="p-1 opacity-0 group-hover:opacity-100 transition-opacity
                 hover:bg-gray-300 dark:hover:bg-gray-600 rounded"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7
                 m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- User Profile -->
    <div
      @click="$emit('open-user-modal')"
      class="p-4 border-t border-gray-200 dark:border-gray-700
             bg-gray-100 dark:bg-gray-800 cursor-pointer
             hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-full bg-blue-600
                 flex items-center justify-center text-white font-semibold"
        >
          SA
        </div>

        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {{ userName }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
            {{ userEmail }}
          </p>
        </div>
      </div>
    </div>

    <!-- Resize Handle -->
    <div
      class="absolute top-0 right-0 w-1 h-full cursor-col-resize
             bg-gray-300 dark:bg-gray-600"
      @mousedown.prevent="startResize"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineEmits(['close', 'new-chat', 'open-user-modal'])

const sidebarWidth = ref(256)
let isResizing = false

const chats = ref([
  'Laravel Interview Prep',
  'Skin Care Recommendations',
  'Remove background from i...',
  'Response suggestion writing',
  'Upload Profile Picture API',
])

const userName = ref('Salako muhammed Awwal')
const userEmail = ref('awwalsalakomuhammed@gmail.com')

const deleteChat = (index: number) => {
  chats.value.splice(index, 1)
}

// Sidebar resizing
const startResize = () => {
  isResizing = true
}

const stopResize = () => {
  isResizing = false
}

const onMouseMove = (e: MouseEvent) => {
  if (!isResizing) return
  sidebarWidth.value = Math.max(200, Math.min(500, e.clientX))
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', stopResize)
})
</script>
