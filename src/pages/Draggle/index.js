import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.styl'

import Dragging from './Dragging'

const getLeft = e => {
    var offset = e.offsetLeft
    if (e.offsetParent != null) {
        offset += getLeft(e.offsetParent)
    }
    return offset
}

class Contain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            row: [
                { span: 6, id: 0, bg: 'red', choice: false, text: '111' },
                { span: 6, id: 1, bg: 'green', choice: false, text: '222' },
                { span: 6, id: 2, bg: 'blue', choice: false, text: '333' },
                { span: 6, id: 3, bg: 'yellow', choice: false, text: '444' }
            ],
            movingEl: null,
            x: 0,
            y: 0
        }
    }

    handleMouseDown(index, event) {
        console.log(this)
        const row = this.state.row.concat()
        row.forEach((v, k) => {
            v.choice = k === index
        })
        row.splice(index, 0, { span: 6, id: 0, bg: '#ccc', choice: false })

        this.setState({
            row
        })

        const handleMove = e => {
            console.log(e.clientX)
        }

        const handleUp = e => {
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseup', handleUp)

            // this.refs.dragging.refs.dragging.removeChild(cloneEl)
        }
        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseup', handleUp)
    }

    render() {
        return (
            <div className="draggle-contain">
                <Dragging
                    ref="dragging"
                    left={this.state.x}
                    top={this.state.y}
                />
                <Row type="flex">
                    {this.state.row.map((v, k) => {
                        return (
                            <Col
                                ref="col"
                                onMouseDown={this.handleMouseDown.bind(this, k)}
                                className="col"
                                span={v.span}
                                order={k}
                                key={v.id}
                                style={{
                                    background: v.bg,
                                    position: v.choice ? 'absolute' : 'static'
                                }}
                            >
                                {v.text}
                            </Col>
                        )
                    })}
                </Row>
            </div>
        )
    }
}

export default Contain
