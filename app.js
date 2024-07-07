const Router = ReactRouterDOM.BrowserRouter
const { Provider } = ReactRedux;

import { store } from "./store/store.js";
import { RootCmp } from './RootCmp.jsx'

const elContainer = document.getElementById('root')
const root = ReactDOM.createRoot(elContainer)
root.render(

    <Provider store={store}>
        <Router>
            <RootCmp />
        </Router>
    </Provider>
)
