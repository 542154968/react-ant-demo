import React, { Component } from 'react'
// router
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '@store'
import Login from '@pages/Login/'
import Index from '@pages/Index/'

//创建store
const store = createStore(reducer)
const requireAuth = (Child, props) => {
    console.log(store.getState())
    if (store.getState().userData.name) {
        return <Child {...props} />
    } else {
        return <Redirect to="/login" />
    }

    // return store.getState().userData.name
}
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router activeClassName="active">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route
                            path="/index"
                            component={props => requireAuth(Index, props)}
                        />
                        <Redirect from="/" to="/index" />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App
