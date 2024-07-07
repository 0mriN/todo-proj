const { Link, NavLink } = ReactRouterDOM
const { useSelector } = ReactRedux


import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'


export function AppHeader() {
    const user = useSelector(storeState => storeState.loggedInUser)
    const todos = useSelector((storeState) => storeState.todos)
    const doneTodosPercent = useSelector((storeState) => storeState.doneTodosPercent)


    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logged Out!')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function getStyleByUser() {
        const prefs = {}
        if (user && user.pref) {
            prefs.color = user.pref.color
            prefs.backgroundColor = user.pref.bgColor
        }
        return prefs
    }

    const formattedPercent = todos ? doneTodosPercent.toFixed(2) + '%' : null
    // ? doneTodosPercent.toFixed(2) + '%' : null
console.log('todos:', todos);
    return (
        <header style={getStyleByUser()} className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section className="flex space-between align-center container">
                        < div >
                            <Link to={`/user`}>Hello {user.fullname}</Link>
                            <p> Balance:{user.balance}</p>
                            <button onClick={onLogout}>Logout</button>
                        </ div >
                        {todos &&
                            <section className="todos-progress">
                                <h3>you have finished {formattedPercent}</h3>
                                <div className="progress-bar-container" >
                                    <span>{formattedPercent}</span>
                                    <div style={{ width: formattedPercent }}>

                                    </div>
                                </div>
                            </section>
                        }
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/user" >User profile</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header >
    )
}
