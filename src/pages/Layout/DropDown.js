import React, { Component } from 'react'
import { Menu, Dropdown, Avatar } from 'antd'

// @withRouter;
class HeadDown extends Component {
    handleClick(event) {
        event.preventDefault()
    }
    logout() {
        window.localStorage.setItem('userData', '')
        this.props.history.push('/login')
    }
    getMenu() {
        return (
            <Menu onClick={this.logout.bind(this)}>
                <Menu.Item>退出</Menu.Item>
            </Menu>
        )
    }

    render() {
        return (
            <Dropdown overlay={this.getMenu.bind(this)}>
                <a
                    style={{ float: 'right' }}
                    className="ant-dropdown-link"
                    href="/"
                    onClick={this.handleClick.bind(this)}
                >
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </a>
            </Dropdown>
        )
    }
}

export default HeadDown
