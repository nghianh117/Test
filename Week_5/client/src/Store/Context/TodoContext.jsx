import { createContext, useReducer } from "react"
import axios from 'axios'
import { todoReducer } from "../Reducers/todoReducer"
import { url } from "../../Api/url"

import {
    TODOS_LOADED,
    TODO,
    CREATE_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    SEARCH_TODO,
    STATUS_TODO
} from '../constant'

export const TodoContext = createContext()

const TodoContextProvider = ({ children }) => {
    const [todoState, dispatch] = useReducer(todoReducer, {
        todo: null,
        todos: [],
        todoLoading: true
    })
    const listTodos = async () => {
        try {
            const rep = await axios.get(`${url}/todo`)
            if (rep.data.success) {
                dispatch({
                    type: TODOS_LOADED,
                    payload: rep.data.data
                })
            }
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
    const getTodo = async (id) => {
        try {
            const rep = await axios.get(`${url}/todo/${id}`)
            if (rep.data.success) {
                dispatch({
                    type: TODO,
                    payload: rep.data.data
                })
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
    const createTodo = async (createForm) => {
        try {
            const rep = await axios.post(`${url}/todo/create`,createForm)
            if (rep.data.success) {
                dispatch({
                    type: CREATE_TODO,
                    payload: rep.data.data
                })
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
    const deleteTodo = async (id) => {
        try {
            const rep = await axios.delete(`${url}/todo/delete/${id}`)
            if (rep.data.success) {
                dispatch({
                    type: DELETE_TODO,
                    payload: rep.data.data
                })
            }
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
    const updateTodo = async (updateFrom,id) => {
        try {
            const rep = await axios.put(`${url}/todo/update/${id}`,updateFrom)
            if (rep.data.success) {
                dispatch({
                    type: UPDATE_TODO,
                    payload: rep.data.data
                })
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
    const searchTodo = async (searchFrom) => {
        try {
            const rep = await axios.post(`${url}/todo/search`,searchFrom)
            if (rep.data.success) {
                dispatch({
                    type: SEARCH_TODO,
                    payload: rep.data.data
                })
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

    const updateStatus = async (id,status) => {
        console.log(status,id)
        try {
            const rep = await axios.post(`${url}/todo/updateStatus/${id}`,{is_done:status})
            if (rep.data.success) {
                dispatch({
                    type: STATUS_TODO,
                    payload: rep.data.data
                })
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




    const TodoContextData = {
        listTodos,
        todoState,
        createTodo,
        deleteTodo,
        updateTodo,
        getTodo,
        searchTodo,
        updateStatus
    }

    return (
        <TodoContext.Provider value={TodoContextData}>
            {children}
        </TodoContext.Provider>
    )
}
export default TodoContextProvider