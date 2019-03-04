import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import routes from './routes'

class Bread extends Component {
    render() {
        const activeMenu =
            routes[
                this.props.activeMenuIndex < 0 ? 0 : this.props.activeMenuIndex
            ]
        return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item key={activeMenu.id}>
                    {activeMenu.name}
                </Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

export default Bread
