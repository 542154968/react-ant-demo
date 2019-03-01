import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUserData } from '@store/action'
import { Row, Col, Form, Icon, Input, Button } from 'antd'
import './login.styl'

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values, this)
                this.props.dispatch(setUserData({ name: values.userName }))
                this.props.history.replace('/index')
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="login">
                <Row type="flex" justify="center">
                    <Col span={4}>
                        <Form
                            onSubmit={this.handleSubmit.bind(this)}
                            className="login-form"
                        >
                            <Form.Item>
                                {getFieldDecorator('userName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入您的用户名'
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{
                                                    color: 'rgba(0,0,0,.25)'
                                                }}
                                            />
                                        }
                                        placeholder="用户名"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入您的密码'
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: 'rgba(0,0,0,.25)'
                                                }}
                                            />
                                        }
                                        type="password"
                                        placeholder="密码"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login)
const FormEl = connect()(WrappedNormalLoginForm)
export default FormEl
