import React, { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

function Auth({children}) {
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [jwt, setJwt] = useState()

    const databaseLoginHandler = (respond) => {
        // console.log(respond.data.jwt)
        setUser(respond.data.user)
        setJwt(respond.data.jwt)
        localStorage.setItem('user', JSON.stringify(respond.data.user))
    }

    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
        window.location.reload()
    }

    return (
        <AuthContext.Provider value={{user, databaseLoginHandler, jwt, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default Auth
