import{
    TODOS_LOADED,
    TODO,
    CREATE_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    SEARCH_TODO,
    STATUS_TODO
}from '../constant'


export const todoReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case TODOS_LOADED:
            return {
                ...state,
                todos:payload
            }
        case SEARCH_TODO:
            return {
                ...state,
                todos:payload
            }
        case TODO:
            return {
                ...state,
                todo:payload
            }
        case CREATE_TODO:
            return {
                ...state,
                todos:[...state.todos,payload]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos:state.todos.map((todo)=>{
                    return todo.id===payload.id?payload:todo
                })
            }
        case STATUS_TODO:
            return {
                ...state,
                todos:state.todos.map((todo)=>{
                    return todo.id===payload.id?payload:todo
                })
            }
        case DELETE_TODO:
            console.log(payload)
            return {
                ...state,
                todos:state.todos.filter((todo)=>todo.id !== payload.id)
            }
        default:
            return state
    }
}