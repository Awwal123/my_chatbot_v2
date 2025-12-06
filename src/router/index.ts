import { createRouter, createWebHistory } from 'vue-router'
import signin from '../components/auth/signin.vue'
import signup from '../components/auth/signup.vue'
import Chat from '@/components/home/Chat.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signin',
      component: signin,
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
    },
  ],
})

export default router
