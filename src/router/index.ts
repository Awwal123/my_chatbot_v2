import { createRouter, createWebHistory } from 'vue-router'
import signin from '../components/auth/signin.vue'
import signup from '../components/auth/signup.vue'
import Chat from '@/components/home/Chat.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', redirect: '/auth/signup' },
  { path: '/auth/signin', component: signin },
  { path: '/auth/signup', component: signup },
  { path: '/chat/:id?',component: Chat, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  // Protect routes that require authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) return '/auth/signin'

  // Redirect logged-in users away from login/signup
  const publicAuthPages = ['/auth/signin', '/auth/signup']
  if (publicAuthPages.includes(to.path) && authStore.isAuthenticated) return '/chat'
})

export default router
