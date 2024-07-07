import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"

const { createStore, compose } = Redux

export const SET_TODOS = 'SET_CARS'
export const REMOVE_TODO = 'REMOVE_CAR'
export const ADD_TODO = 'ADD_CAR'
export const UPDATE_TODO = 'UPDATE_CAR'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_USER = 'SET_USER'
export const SET_DONE_TODOS_PERCENT = 'SET_DONE_TODOS_PERCENT'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    sortBy: 'txt',
    doneTodosPercent: 0,
    isLoading: false,
    loggedInUser: userService.getLoggedinUser()
}

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
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
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_DONE_TODOS_PERCENT:
            return { ...state, doneTodosPercent: cmd.doneTodosPercent }
        case SET_MAX_PAGE:
            return { ...state, maxPage: cmd.maxPage }
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
        case SET_USER_BALANCE:
            if (!state.user) return state
            return { ...state, user: { ...state.user, balance: cmd.balance } }

        default: return state
    }

}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(appReducer, composeEnhancers())
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})