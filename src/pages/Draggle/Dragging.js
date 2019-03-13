import React, { Component } from 'react'

class Dragging extends Component {
    render() {
        return (
            <div
                ref="dragging"
                className="dragging ant-row-flex"
                style={{
                    left: this.props.left + 'px',
                    top: this.props.top + 'px'
                }}
                dangerouslySetInnerHTML={this.props.children}
            />
        )
    }
}

export default Dragging
