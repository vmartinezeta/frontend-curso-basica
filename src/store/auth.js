import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginRequest } from "../api/auth";


export const useAuthStore = create(persist((set, get) => ({
  isAuth: false,
  user: null,
  signin: async (data) => {
    try {
      const res = await loginRequest(data)
      const user = res.data
      set((state) => ({ user, isAuth: true }))
    } catch (error) { }
  },
  logout: () => set(() => ({ user: null, token: null, profile: null, isAuth: false }))
}),
  {
    name: "auth",
  }
))