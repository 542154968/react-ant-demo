import React, { Component } from 'react'
// import { HashRouter as NavLink } from 'react-router-dom'
// import Index from '@pages/Index/'
// import List from '@pages/List/'
import { Layout, Menu } from 'antd'
import DropDown from './DropDown'
import Bread from './Breadcrumb'
import routes from './routes'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './layout.stylus'
const { Header, Content, Sider } = Layout
class Lay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultMenuKeys: [this.props.location.pathname],
            activeMenuIndex: this.getActiveMenuIndex(),
            transitionState: true
        }
    }
    handleClick(data, event, path) {
        this.setState({
            defaultMenuKeys: [data.key]
        })
        this.props.history.push(data.path)
    }

    getMenu = arr => {
        return arr.map(v => {
            return (
                <Menu.Item
                    key={v.path}
                    onClick={this.handleClick.bind(this, v)}
                >
                    {v.name}
                </Menu.Item>
            )
        })
    }

    getActiveMenuIndex() {
        const path = this.props.location
        return routes.findIndex(v => v.path === path.pathname)
    }

    render() {
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
                                    timeout={800}
                                >
                                    {this.props.children}
                                </CSSTransition>
                            </TransitionGroup>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Lay
