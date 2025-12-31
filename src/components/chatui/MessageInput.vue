<template>
  <div
    class="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4 md:px-8 flex-shrink-0 transition-colors duration-300"
  >
    <div class="flex gap-3">
      <input
        v-model="inputMessage"
        :disabled="props.disabled"
        @keyup.enter="handleSend"
        type="text"
        placeholder="Ask me anything..."
        class="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
      />
      <button
        class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center"
        :disabled="props.disabled"
        @click="handleSend"
      >

        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16390399 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99721575 L3.03521743,10.4382088 C3.03521743,10.5953061 3.19218622,10.7524035 3.50612381,10.7524035 L16.6915026,11.5378905 C16.6915026,11.5378905 17.1624089,11.5378905 17.1624089,12.0091827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ disabled?: boolean }>()
const emit = defineEmits<{
  'send-message': [message: string]
}>()

const inputMessage = ref('')

const handleSend = () => {
  if (props.disabled) return
  if (!inputMessage.value.trim()) return

  emit('send-message', inputMessage.value)
  inputMessage.value = ''
}
</script>
