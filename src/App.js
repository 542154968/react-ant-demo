import React, { Component } from 'react'
// router Redirect
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '@store'
import Login from '@pages/Login/'
import Layout from '@pages/Layout/'
// import { message } from 'antd'
// import Index from '@pages/Index/'
// import Table from '@pages/Table/'
// import Ani from '@pages/Animation/'

//创建store
const store = createStore(reducer)
// const requireAuth = (Child, props) => {
//     let userData = window.localStorage.getItem('userData')
//     try {
//         userData = JSON.parse(userData)
//     } catch (error) {
//         return <Redirect to="/login" />
//     }
//     if (userData && userData.name) {
//         return <Child {...props} />
//     } else {
//         message.error('登录已过期，请重新登录')
//         return <Redirect to="/login" />
//     }

//     // return store.getState().userData.name
// }
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router activeClassName="active">
                    <>
                        <Switch>
                            <Route path="/login" component={Login} />
                            {/* 写法二 拆分路由 路由显示在别的组件里 */}
                            <Layout path="/" component={Layout}>
                                {/* 写法1  将路由集中在一起 */}
                                {/* <Route
                                    exact
                                    path="/index"
                                    component={props =>
                                        requireAuth(Index, props)
                                    }
                                />
                                <Route
                                    exact
                                    path="/table"
                                    component={props =>
                                        requireAuth(Table, props)
                                    }
                                />
                                <Route
                                    exact
                                    path="/ani"
                                    component={props => requireAuth(Ani, props)}
                                /> */}
                            </Layout>
                        </Switch>
                    </>
                </Router>
            </Provider>
        )
    }
}

export default App
