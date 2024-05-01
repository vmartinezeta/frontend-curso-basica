import { useEffect, useState } from "react"
import { useAuthStore } from "../store/auth"
import { Outlet, Navigate } from "react-router-dom"


function ProtectedRouteProfesor() {
    const { isAuth, user} = useAuthStore()

    if (!isAuth) {
        return <Navigate to="/login" replace />
    } else if (user.rolname !== "profesor") {
        return <Navigate to="/curso" replace />
    }

    return <Outlet />
}

export default ProtectedRouteProfesor