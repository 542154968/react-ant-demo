import React, { Component } from 'react'
// router
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
// redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '@store'
import Login from '@pages/Login/'
import Layout from '@pages/Layout/'
import { message } from 'antd'
import Index from '@pages/Index/'
import List from '@pages/List/'

//创建store
const store = createStore(reducer)
const requireAuth = (Child, props) => {
    let userData = window.localStorage.getItem('userData')
    try {
        userData = JSON.parse(userData)
    } catch (error) {
        return <Redirect to="/login" />
    }
    if (userData && userData.name) {
        return <Layout {...props} children={<Child {...props} />} />
    } else {
        message.error('登录已过期，请重新登录')
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
                        {/* <Redirect from="/" to="/index" /> */}
                        <Route
                            path="/index"
                            component={props => requireAuth(Index, props)}
                        />
                        <Route
                            path="/list"
                            component={props => requireAuth(List, props)}
                        />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App
