import { useAuthStore } from "../store/auth"
import { useLocation, Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
    const { isAuth, user} = useAuthStore()
    const location = useLocation()

    if (!isAuth && location.pathname!=="/login") {
        return <Navigate to="/login" replace />
    } else if (user.rolname !== "admin") {
        return <Navigate to="/evaluacion" replace />
    }

    return <Outlet />
}

export default ProtectedRoute