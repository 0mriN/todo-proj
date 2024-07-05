import { todoService } from "../../services/todo.service.js"
import { ADD_TODO, REMOVE_TODO, SET_IS_LOADING, SET_TODOS, UPDATE_TODO, store } from "../store.js"


export function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('todo action -> cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })

}

export function removeTodo(todoId) {
    let res = confirm('are you sure you want to delete this todo ?')
    if (!res) return Promise.reject()

        return todoService.remove(todoId)
            .then(() => {
                store.dispatch({ type: REMOVE_TODO, todoId })
            })
            .catch(err => {
                console.log('todo action -> cannot remove todos', err)
                throw err
            })
    
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            return saveTodo
        })
        .catch(err => {
            console.log('todo action -> cannot save todos', err)
            throw err
        })
}

export function setTodos(todo) {
    return { type: UPDATE_TODO, todo }
}