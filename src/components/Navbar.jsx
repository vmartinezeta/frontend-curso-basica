import React from 'react'
import { useAuthStore } from '../store/auth'
import { NavLink } from 'react-router-dom'


function Navbar() {
    const { isAuth, logout, user } = useAuthStore()    
    if (isAuth) {

        if (user.rolname === "profesor") {
            return <div className="navbar">
                <ul className="menu-default">
                    <li className="menu-default__item"><NavLink className="menu-default__link" to="/curso">Evaluación</NavLink></li>
                    <li className="menu-default__item"><NavLink className="menu-default__link" to="/" onClick={logout}>Logout({user.username})</NavLink></li>
                </ul>
            </div>
        }

        return <div className="navbar">
            <ul className="menu-default">
                <li className="menu-default__item"><NavLink className="menu-default__link" to="/admin">Admin</NavLink></li>
                <li className="menu-default__item"><NavLink className="menu-default__link" to="/curso">Curso</NavLink></li>
                <li className="menu-default__item"><NavLink className="menu-default__link" to="/grado">Grado</NavLink></li>
                <li className="menu-default__item"><NavLink className="menu-default__link" to="/asignatura">Asignatura</NavLink></li>
                <li className="menu-default__item"><NavLink className="menu-default__link" to="/profesor">Profesor</NavLink></li>                
                <li className="menu-default__item"><NavLink className="menu-default__link" to="/" onClick={logout}>Logout({user.username})</NavLink></li>
            </ul>
        </div>
    }

    return <div className="navbar">
        <ul className="menu-default">
            <li className="menu-default__item"><NavLink className="menu-default__link" to="/">Home</NavLink></li>
            <li className="menu-default__item"><NavLink className="menu-default__link" to="/login">Login</NavLink></li>
        </ul>
    </div>
}

export default Navbar