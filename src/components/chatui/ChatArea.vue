<template>
  <div
    ref="messagesContainer"
    class="flex-1 overflow-y-auto px-4 py-6 space-y-4 flex flex-col bg-white dark:bg-gray-800"
  >
   <div v-if="loading" class="space-y-4 mt-6">
  <div v-for="n in 6" :key="n" class="flex">
    <div
      class="animate-pulse h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700"
    />
  </div>
</div>


    <div
      v-else-if="messages.length === 0"
      class="flex items-center justify-center h-full"
    >
      <p class="text-gray-500">Start a conversation</p>
    </div>

    <div
      v-for="msg in messages"
      :key="msg.id"
      :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']"
    >
      <div
        :class="[
          'max-w-lg px-4 py-2 rounded-2xl prose dark:prose-invert',
          msg.role === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700'
        ]"
      >
        <div v-if="msg.role === 'assistant'" v-html="md.render(msg.content)" />
        <p v-else>{{ msg.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

defineProps<{
  messages: Message[]
  loading: boolean
}>()

const messagesContainer = ref<HTMLElement | null>(null)

const md = new MarkdownIt({
  linkify: true,
  typographer: true,
})

watch(
  () => messagesContainer.value,
  async () => {
    await nextTick()
    messagesContainer.value?.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth',
    })
  }
)
</script>
