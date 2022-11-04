import { createContext, useReducer } from "react"
import axios from 'axios'
import { authReducer } from "../Reducers/authReducer"
import { url } from "../../Api/url"
import setAuthToken from "../../Api/util"
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    const checkLogin = async () => {
        if (localStorage['token']) {
            setAuthToken(localStorage['token'])
        }
        try {
            const response = await axios.get(`${url}/checklogin`)
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user }
                })
            }

        } catch (error) {
            localStorage.removeItem('token')
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }
    const register = async (formData) => {
        try {
            const rep = await axios.post(`${url}/register`, formData)
            if (rep.data.success) {
                localStorage.setItem('token', rep.data.accessToken)
            }
            return rep.data
        } catch (error) {
            if (error.response.data) {
                return error.response.data
            } else {
                return {
                    success: false,
                    message: error.message
                }
            }
        }
    }
    const login = async (formData) => {
        try {
            const rep = await axios.post(`${url}/login`, formData)
            if (rep.data.success) {
                localStorage.setItem('token', rep.data.accessToken)
            }
            return rep.data
        } catch (error) {
            if (error.response.data) {
                return error.response.data
            } else {
                return {
                    success: false,
                    message: error.message
                }
            }
        }
    }
    const logout = () => {
        localStorage.removeItem('token')
        setAuthToken(null)
        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null
            }
        })
    }
    const AuthContextData = { authState, login, logout, register, checkLogin }

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )


}
export default AuthContextProvider