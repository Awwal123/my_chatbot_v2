import { defineStore } from 'pinia'

type User = {
  id: number
  name: string
  email: string
}

type AuthPayload = {
  token: string
  user: User
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setAuth(payload: AuthPayload, remember = true) {
      this.token = payload.token
      this.user = payload.user

      localStorage.setItem('auth', JSON.stringify(payload))
      console.log('LocalStorage auth:', localStorage.getItem('auth'))
    },

    hydrate() {
      const saved = localStorage.getItem('auth')
      console.log('Saved auth from localStorage:', saved)
      if (!saved) return

      const parsed = JSON.parse(saved) as AuthPayload
      console.log('Parsed auth:', parsed)
      this.token = parsed.token
      this.user = parsed.user
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('auth')
    },
  },
})
