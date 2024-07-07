const { useEffect, useState } = React
const { useSelector } = ReactRedux

import { Chart } from '../cmps/Chart.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'
import { loadTodos } from '../store/actions/todo.actions.js'

export function Dashboard() {
    const todos = useSelector
        ((storeState) => storeState.todos)

    useEffect(() => {
        if (!todos.length) loadTodos()
            .catch(() => {
                showErrorMsg('Could not load todos')
            })
    }, [])

    const [importanceStats, setImportanceStats] = useState([])

    useEffect(() => {
        todoService.getImportanceStats()
            .then(setImportanceStats)
    }, [])

    if (!todos) return <div>Loading...</div>

    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {todos.length} Todos</h2>
            <hr />
            <h4>By Importance</h4>
            <Chart data={importanceStats} />
        </section>
    )
}