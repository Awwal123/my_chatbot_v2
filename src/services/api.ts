import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const AXIOS = axios.create({
  baseURL: 'https://prompt-flow-backend-ccw2.onrender.com/api',
  headers: {
    Accept: 'application/json',          
    'Content-Type': 'application/json',  
  },
})

AXIOS.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    authStore.hydrate()

    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
AXIOS.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const message = error.response?.data?.message || 'Something went wrong'
    return Promise.reject(error)
  }
)

AXIOS.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const authStore = useAuthStore()
    if (error.response?.status === 401) {
      authStore.logout()
      router.push('/auth/signin')
    }
    return Promise.reject(error)
  }
)

export type SignupRequest = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type LoginRequest = {
  email: string
  password: string
}


export const authService = {
  registerUser: (request: SignupRequest) => AXIOS.post('/auth/register', request),
  loginUser: (request: LoginRequest) => AXIOS.post('/auth/login', request),
  logoutUser: () => AXIOS.post('/auth/logout'),
}

export const chatService = {
  getChats: () => AXIOS.get('/chats'),
  createChat: (payload: { title: string }) => AXIOS.post('/chats', payload),
  deleteChat: (chatId: number | string) => AXIOS.delete(`/chats/${chatId}`),
  getMessages: (chatId: number | string) => AXIOS.get(`/chats/${chatId}/messages`),
sendMessage: (chatId: number | string, payload: { message: string }) =>
  AXIOS.post(`/chats/${chatId}/messages`, payload),
}

export default AXIOS
