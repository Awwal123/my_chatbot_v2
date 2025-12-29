import { defineStore } from "pinia";

type User = {
  id: number;
  name: string;
  email: string;
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") as string | null,
    user: localStorage.getItem("user")
      ? (JSON.parse(localStorage.getItem("user")!) as User)
      : null,
  }),

  actions: {
    setAuth(token: string, user: User) {
      this.token = token;
      this.user = user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout() {
      this.token = null;
      this.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
