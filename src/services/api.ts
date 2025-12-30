import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'

const AXIOS = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
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
    console.error('[API ERROR]', message)
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
  // Fetch all chats
  getChats: () => AXIOS.get('/chats'),

  // Create a new chat
  createChat: (payload: { title: string }) => AXIOS.post('/chats', payload),

  // Delete a chat
  deleteChat: (chatId: number | string) => AXIOS.delete(`/chats/${chatId}`),

  // Fetch messages for a specific chat
  getMessages: (chatId: number | string) => AXIOS.get(`/chats/${chatId}/messages`),

  // Send a message in a specific chat
sendMessage: (chatId: number | string, payload: { message: string }) =>
  AXIOS.post(`/chats/${chatId}/messages`, payload),
}

export default AXIOS
