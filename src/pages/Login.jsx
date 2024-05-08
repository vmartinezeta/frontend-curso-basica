import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuthStore } from '../store/auth'
import Navbar from '../components/Navbar'
import { useForm } from 'react-hook-form'



function Login() {
    const { signin, user, isAuth } = useAuthStore()
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()


    useEffect(() => {
        if (isAuth && user.rolname === "profesor") {
            navigate("/evaluacion")
        } else if (isAuth && user.rolname === "admin") {
            navigate("/admin")
        }
    }, [isAuth])


    const onLogin = handleSubmit(async (data) => {
        await signin(data)
    })

    return <div className="app">
        <Navbar />
        <form className="loginform" onSubmit={onLogin}>
            <h1 className="loginform__title">Login</h1>
            <input
                autoFocus={true}
                {...register("username")}
                autoComplete="off"
                className="loginform__input"
                type="text"
                placeholder="Username" />
            <input
                {...register("password")}
                autoComplete="off"
                type="password"
                className="loginform__input"
                placeholder="Password" />
            <button className="loginform__button">Sing in</button>
        </form>
    </div>
}

export default Login