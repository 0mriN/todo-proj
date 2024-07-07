const { useSelector } = ReactRedux
const { useEffect, useState } = React


export function AppFooter() {
    const todos = useSelector((storeState) => storeState.todos)
    const user = useSelector((storeState) => storeState.user)
    const doneTodosPercent = useSelector((storeState) => storeState.doneTodosPercent)



    function getStyleByUser() {
        const prefs = {
            color: '',
            backgroundColor: ''
        }

        if (user && user.pref) {
            prefs.color = user.pref.color
            prefs.backgroundColor = user.pref.bgColor
        }

        return prefs
    }



    const formattedPercent = doneTodosPercent.toFixed(2) + '%'
    
    return (
        <footer style={getStyleByUser()} className='full'>
            {user && todos &&
                <section className="todos-progress">
                    <h3>you have finished {formattedPercent}</h3>
                    <div className="progress-bar-container" >
                        <span>{formattedPercent}</span>
                        <div style={{ width: formattedPercent }}>

                        </div>
                    </div>
                </section>}
        </footer>
    )
}
