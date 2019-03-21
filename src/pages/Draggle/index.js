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
let curComponent = {
    x: 0,
    y: 0,
    col: 0
}
// 判断是不是盒子内的
let isOuter = true
let contain = {
    width: 900,
    // 横向24个格子 900/24 37.5
    item: 37.5, // 一个格子宽,
    offsetLeft: 0
}

const getLeft = e => {
    let offset = e.offsetLeft
    if (e.offsetParent != null) offset += getLeft(e.offsetParent)
    return offset
}

class Contain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            row: [
                {
                    span: 4,
                    id: 0,
                    bg: 'red',
                    type: 'Radio'
                },
                {
                    span: 4,
                    id: 1,
                    bg: 'green',
                    type: 'Checkbox'
                }
            ],
            component: {
                Radio: <Radio />,
                Checkbox: <Checkbox />
            },
            renderDom: new Array(24)
                .fill(1)
                .map((v, k) => <Col key={`${k}-default`} span={1} />)
        }
    }

    componentDidMount() {
        contain.offsetLeft =
            getLeft(document.querySelector('.attach-contain')) || 0
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

    handleDragStart(data, event) {
        event.dataTransfer.setData('Text', event.target.dataset.type)
        // 如果是已经在里面的
        if (data.type === 'in') {
            curComponent = {
                x: event.clientX,
                y: event.clientY
            }
            isOuter = false
        } else {
            isOuter = true
        }
        console.log(event.clientX)
    }

    handleDragOver(event) {
        event.preventDefault()
        if (isOuter) {
            return
        } else {
        }
        console.log(event.clientX - curComponent.x)
    }

    handleDrop(event) {
        event.preventDefault()
        var data = event.dataTransfer.getData('Text')
        data && this.setDomData(data, event.clientX)
    }

    setDomData(type, clientX) {
        console.log(clientX, contain.offsetLeft)
        domData.push({
            type,
            span: 4,
            offset: Math.round((clientX - contain.offsetLeft) / contain.item)
        })
        console.log(domData)
        this.setRenderDom()
    }
    setRenderDom() {
        const dom = domData.map((v, k) => {
            return (
                <Col
                    span={v.span}
                    key={`${v.type}${k}`}
                    offset={v.offset}
                    draggable

                    // onDragStart={this.handleDragStart.bind(this, {
                    //     type: 'in',
                    //     col: v.span
                    // })}
                >
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
                                onDragStart={this.handleDragStart.bind(this, {
                                    type: 'out',
                                    col: v.span
                                })}
                                className="col"
                                span={v.span}
                                order={k}
                                key={v.id}
                                style={{ background: v.bg }}
                                draggable
                                data-type={v.type}
                            >
                                {this.state.component[v.type]}
                            </Col>
                        )
                    })}
                </Row>
                {/* 网格分为横向24个格子  */}
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
