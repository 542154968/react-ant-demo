import React, { Component } from 'react'
// import { HashRouter as NavLink } from 'react-router-dom'
// import Index from '@pages/Index/'
// import List from '@pages/List/'
import { Layout, Menu, Breadcrumb } from 'antd'
import DropDown from './DropDown'
const { Header, Content, Sider } = Layout
class Lay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultMenuKeys: [this.props.location.pathname]
        }
    }
    handleClick(data, event, path) {
        this.setState({
            defaultMenuKeys: [data.key]
        })
        this.props.history.push(data.path)
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
                            {/* 这段代码真吭  Navlink 配合着会报错  */}

                            <Menu.Item
                                key="/index"
                                onClick={this.handleClick.bind(this, {
                                    key: '1',
                                    path: '/index'
                                })}
                            >
                                首页
                            </Menu.Item>
                            <Menu.Item
                                key="/list"
                                onClick={this.handleClick.bind(this, {
                                    key: '2',
                                    path: '/list'
                                })}
                            >
                                列表
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item key="首页">首页</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Lay
