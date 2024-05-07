import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loginRequest } from "../api/auth";
import { useSelectedStore } from "./useSelected";


export const useAuthStore = create(persist((set, get) => ({
  isAuth: false,
  user: null,
  signin: async (data) => {
    try {
      const res = await loginRequest(data)
      const user = res.data
      set(() => ({ user, isAuth: true }))
    } catch (error) { }
  },
  logout: () => {
    const { setPeriodoSelected } = useSelectedStore.getState()
    setPeriodoSelected(null)
    set(() => ({ user: null, isAuth: false }))
  }
}),
  {
    name: "auth",
  }
))