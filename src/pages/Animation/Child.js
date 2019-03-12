import React, { Component } from 'react'

class Child extends Component{
    
    handleClick(){
        this.props.onParentEvent(666)
    }
    render(){
        return (
            <h1 onClick={this.handleClick.bind(this)}>我是子，点我触发父级事件！</h1>
        )
    }
}

export default Child