import { todoService } from "../../services/todo.service.js"
import { ADD_TODO, REMOVE_TODO, SET_IS_LOADING, SET_TODOS, UPDATE_TODO, store, SET_DONE_TODOS_PERCENT, SET_MAX_PAGE } from "../store.js"
import { addActivity } from './user.actions.js'


export function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(({ todos, maxPage, doneTodosPercent }) => {
            store.dispatch({ type: SET_TODOS, todos })
            _setTodosData(doneTodosPercent, maxPage)
            return todos
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
        .then(({ maxPage, doneTodosPercent }) => {
            store.dispatch({
                type: REMOVE_TODO,
                todoId
            })
            _setTodosData(doneTodosPercent, maxPage)
        })
        .then(() => addActivity('Removed the Todo: ' + todoId))
        .catch(err => {
            console.log('todo action -> cannot remove todos', err)
            throw err
        })

}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(({ maxPage, doneTodosPercent, savedTodo }) => {
            store.dispatch({
                type,
                todo: savedTodo
            })
            _setTodosData(doneTodosPercent, maxPage)
            return savedTodo
        })
        .then(res => {
            const actionName = (todo._id) ? 'Updated' : 'Added'
            return addActivity(`${actionName} a Todo: ` + todo.txt).then(() => res)
        })
        .catch(err => {
            console.log('todo action -> cannot save todos', err)
            throw err
        })
}

export function updateTodo(todo) {
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({
                type: UPDATE_TODO,
                todo: savedTodo
            })
        })
}

function _setTodosData(doneTodosPercent, maxPage) {
    store.dispatch({
        type: SET_DONE_TODOS_PERCENT,
        doneTodosPercent
    })
    store.dispatch({
        type: SET_MAX_PAGE,
        maxPage
    })
}
