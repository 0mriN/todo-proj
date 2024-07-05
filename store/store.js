import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_CARS'
export const REMOVE_TODO = 'REMOVE_CAR'
export const ADD_TODO = 'ADD_CAR'
export const UPDATE_TODO = 'UPDATE_CAR'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_USER = 'SET_USER'

const initialState = {
    count: 101,
    cars: [],
    isLoading: false,
    loggedInUser: userService.getLoggedinUser()
}

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 }
        case 'DECREMENT':
            return { ...state, count: state.count - 1 }
        case 'CHANGE_BY':
            return { ...state, count: state.count + cmd.diff }
        case SET_TODOS:
            return {
                ...state,
                todos: cmd.todos
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, cmd.todo]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo)
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }
        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
        default: return state
    }

}


export const store = createStore(appReducer)
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})