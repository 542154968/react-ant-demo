import React, { Component } from 'react'
// 写法二的话 不能用 HashRouter as
// import { HashRouter as Route, Switch, withRouter } from 'react-router-dom'
import { Route, Switch, withRouter } from 'react-router-dom'
import Index from '@pages/Index/'
import Table from '@pages/Table/'
import Ani from '@pages/Animation/'
import Draggle from '@pages/Draggle/'

import { Layout, Menu } from 'antd'
import DropDown from './DropDown'
import Bread from './Breadcrumb'
import routes from './routes'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './layout.styl'
const { Header, Content, Sider } = Layout
class Lay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultMenuKeys: [this.props.location.pathname],
            activeMenuIndex: 0
        }
    }

    componentWillMount() {
        const pathname = this.props.location.pathname
        if (pathname === '/') {
            this.props.history.replace('/index')
            this.setState({
                activeMenuIndex: 0,
                defaultMenuKeys: ['/index']
            })
        }
    }
    handleClick(data) {
        const path = data.data.path
        this.setState({
            defaultMenuKeys: [path],
            activeMenuIndex: data.index
        })
        this.props.history.push(path)
    }

    getMenu = arr => {
        return arr.map((v, k) => {
            return (
                <Menu.Item
                    key={v.path}
                    onClick={this.handleClick.bind(this, { data: v, index: k })}
                >
                    {v.name}
                </Menu.Item>
            )
        })
    }

    getActiveMenuIndex() {
        const path = this.props.location
        const index = routes.findIndex(v => v.path === path.pathname)
        return index > -1 ? index : 0
    }

    render() {
        const location = this.props.location
        return (
            <Layout>
                <Header className="header">
                    <h1 style={{ color: '#fff', float: 'left' }}>
                        皓天用户管理系统
                    </h1>
                    <DropDown {...this.props} />
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={this.state.defaultMenuKeys}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {this.getMenu(routes)}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Bread activeMenuIndex={this.state.activeMenuIndex} />
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280
                            }}
                        >
                            <TransitionGroup>
                                <CSSTransition
                                    // 需要加一个key属性，让react认识每个组件，并进行正确的加载。
                                    // 这里我改了官方demo的代码， 原来是设置成location.key， 这样的话每次点击同一个路由链接的时候都会渲染。
                                    key={this.props.location.pathname}
                                    // classNames 就是设置给css动画的标示，记得'classNames'带's'的。
                                    classNames="slide"
                                    // 动画时间设置为800ms，和css中的需要一致。
                                    timeout={300}
                                >
                                    {/* <>{this.props.children}</> 这是写法1的子 */}
                                    <Switch location={location}>
                                        <Route
                                            path="/index"
                                            component={Index}
                                        />
                                        <Route
                                            path="/table"
                                            component={Table}
                                        />
                                        <Route path="/ani" component={Ani} />
                                        <Route
                                            path="/draggle"
                                            component={Draggle}
                                        />
                                    </Switch>
                                </CSSTransition>
                            </TransitionGroup>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Lay)
