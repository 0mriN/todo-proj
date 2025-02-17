import { userService } from "../../services/user.service.js"
import { SET_USER, SET_USER_BALANCE, store } from "../store.js"



export function updateUser(userToUpdate) {
    return userService.updateUserPreffs(userToUpdate)
        .then((updatedUser) => {
            store.dispatch({
                type: SET_USER,
                user: updatedUser,
            })
        })
        .catch(err => {
            console.error('Cannot update user:', err)
            throw err
        })
}

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({
                type: SET_USER,
                user
            })
            return user
        })
        .catch((err) => {
            console.log('user actions -> cannot login', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then((user) => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch((err) => {
            console.log('user actions -> cannot signup', err)
            throw err
        })
}

export function logout(credentials) {
    return userService.logout(credentials)
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> cannot logout', err)
            throw err
        })
}

export function addActivity(txt) {
    return userService.addActivity(txt)
        .then((updatedUser) => {
            store.dispatch({
                type: SET_USER,
                user: updatedUser,
            })
        })
        .catch(err => {
            console.error('Cannot add activity:', err)
            throw err
        })

}

export function changeBalance(amount) {
    return userService.updateBalance(amount)
        .then(newBalance => {
            store.dispatch({ type: SET_USER_BALANCE, balance: newBalance })
            return newBalance
        })
        .catch(err => {
            console.error('Cannot change balance:', err)
            throw err
        })
}
