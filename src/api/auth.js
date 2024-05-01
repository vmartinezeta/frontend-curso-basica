import authApi from "../libs/axios"

export const loginRequest = async (user) => authApi.post("/login", user)

export const logoutRequest = async () => authApi.post("/logout")

export const verifyTokenRequest = async () => authApi.get("/verifyToken")

export const createUserRequest = async (user) => authApi.post("/register", user)


