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
    const { resetPeriodo, resetAll } = useSelectedStore.getState()
    const {user} = get()
    if (user.rolname==="profesor") {
      resetPeriodo()
    } else {
      resetAll()
    }
    set(() => ({ user: null, isAuth: false }))
  }
}),
  {
    name: "auth",
  }
))