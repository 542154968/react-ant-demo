import React, { Component } from 'react'
import { Row, Col, Radio, Checkbox } from 'antd'
import './index.styl'

import Dragging from './Dragging'

// const getLeft = e => {
//     var offset = e.offsetLeft
//     if (e.offsetParent != null) {
//         offset += getLeft(e.offsetParent)
//     }
//     return offset
// }

let domData = []

class Contain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            row: [
                {
                    span: 6,
                    id: 0,
                    bg: 'red',
                    type: 'Radio'
                },
                {
                    span: 6,
                    id: 1,
                    bg: 'green',
                    type: 'Checkbox'
                }
            ],
            component: {
                Radio: <Radio />,
                Checkbox: <Checkbox />
            },

            renderDom: null
        }
    }

    // 先用html5的拖拽
    // handleMouseDown(index, event) {
    //     const handleMove = e => {
    //         console.log(e.clientX)
    //     }

    //     const handleUp = e => {
    //         document.removeEventListener('mousemove', handleMove)
    //         document.removeEventListener('mouseup', handleUp)

    //         // this.refs.dragging.refs.dragging.removeChild(cloneEl)
    //     }
    //     document.addEventListener('mousemove', handleMove)
    //     document.addEventListener('mouseup', handleUp)
    // }

    handleDragStart(event) {
        event.dataTransfer.setData('Text', event.target.dataset.type)
    }

    handleDragOver(event) {
        event.preventDefault()
    }

    handleDrop(event) {
        event.preventDefault()
        var data = event.dataTransfer.getData('Text')
        this.setDomData(data)
    }

    setDomData(type) {
        // const domArr = this.state.domData.concat()
        // domArr.push({ type, span: 4 })
        // this.setState({
        //     domData: domArr
        // })
        // this.setRenderDom()
        domData.push({ type, span: 4 })
        this.setRenderDom()
    }
    setRenderDom() {
        const dom = domData.map((v, k) => {
            return (
                <Col span={v.span} key={`${v.type}${k}`}>
                    {this.state.component[v.type]}
                </Col>
            )
        })
        this.setState({
            renderDom: dom
        })
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
                                onDragStart={this.handleDragStart.bind(this)}
                                className="col"
                                span={v.span}
                                order={k}
                                key={v.id}
                                draggable
                                data-type={v.type}
                            >
                                {this.state.component[v.type]}
                            </Col>
                        )
                    })}
                </Row>
                <div
                    className="attach-contain"
                    onDrop={this.handleDrop.bind(this)}
                    onDragOver={this.handleDragOver.bind(this)}
                >
                    {this.state.renderDom}
                </div>
            </div>
        )
    }
}

export default Contain
