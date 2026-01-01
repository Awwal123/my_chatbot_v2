<template>
  <div class="min-h-screen bg-[#cde5f8] md:bg-white flex flex-col lg:flex-row">
    <div
      class="w-full lg:w-1/2 flex items-center justify-center min-h-72 lg:min-h-screen relative overflow-hidden order-first lg:order-none"
    >
      <img
        :src="Desktopbg"
        alt="Desktop background"
        class="hidden lg:block w-full h-screen object-contain object-left"
      />

      <img
        :src="mobilebg"
        alt="Mobile background"
        class="block lg:hidden relative w-full h-[50%] object-cover"
      />
    </div>

    <div
      class="w-full lg:w-1/2 flex items-center justify-center px-4 py-10 relative -mt-60 mt- lg:mt-0 z-10"
    >
      <div class="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl relative">


        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p class="text-gray-600 mb-8">Sign in to your account</p>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                v-model="form.email"
                type="email"
                placeholder="domat@example.com"
                class="w-full pl-10 pr-4 py-3 border-2 border-blue-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

   
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-400"
              />

              <button
                @click="showPassword = !showPassword"
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2">
            <div class="flex items-center gap-2">
              <input
                id="remember"
                v-model="form.rememberMe"
                type="checkbox"
                class="w-5 h-5 accent-blue-600"
              />
              <label for="remember" class="text-sm text-gray-700 cursor-pointer">Remember me</label>
            </div>

            <a href="#" class="text-sm text-blue-600 hover:underline font-semibold">
              Forgot Password
            </a>
          </div>


          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition"
          >
            <span v-if="!loading">Login</span>
            <span v-else>Logging in...</span>
          </button>


          <div class="relative py-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-600">or</span>
            </div>
          </div>


          <button
            type="button"
            class="w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-full hover:bg-blue-50 transition flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

    
          <div class="text-center pt-2">
            <p class="text-gray-700">
              Don’t have an account?
              <router-link to="/auth/signup" class="text-blue-600 hover:underline font-semibold"
                >Sign up</router-link
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Desktopbg from '@/assets/images/desktopbg.png'
import mobilebg from '@/assets/images/mobilebg.png'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { authService } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const toast = useToast()
const authStore = useAuthStore()
const loading = ref(false)
const showPassword = ref(false)

const form = ref({
  email: '',
  password: '',
  rememberMe: false,
})

const handleSubmit = async () => {
  if (loading.value) return
  loading.value = true

  try {
    const res = await authService.loginUser({
      email: form.value.email,
      password: form.value.password,
    })

    const { user, token } = res.data.data

  
    authStore.setAuth(
      { token, user: { id: user.id, name: user.name, email: user.email } },
      form.value.rememberMe
    )

        console.log('After login - authStore state:', authStore.$state)

    toast.success('Logged in successfully')
    router.replace('/chat')
  } catch (err: any) {
    // toast.error(err?.response?.data?.message || 'Login failed')
  } finally {
    loading.value = false
  }
}


</script>
