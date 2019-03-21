import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.styl'

let grid = {
    width: 1440,
    item: {
        width: 60, // 1440 / 24 = 60
        hegiht: 0
    }
}

let moveDom = {
    x: 0,
    y: 0,
    offset: 0
}
// 一个格子是 60宽度

class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grid: ['1', '2', '3', '4'],
            renderDom: (
                <Col
                    span={6}
                    draggable
                    offset={moveDom.offset}
                    onDragStart={this.handleDragStart.bind(this)}
                    onDrag={this.handleDrag.bind(this)}
                >
                    格子1
                </Col>
            )
        }
    }
    componentDidMount() {}

    handleDragStart(event) {
        // event.preventDefault()
        // console.log(event.target)
        moveDom.x = event.clientX
        moveDom.y = event.clientY
        console.log(event.offsetLeft)
    }

    handleDragOver(event) {
        event.preventDefault()
        // console.log(event)
    }

    handleDrag(event) {
        // 移动的距离
        const moveLong = event.clientX - moveDom.x
        // 每个格子是 60宽度 一半就是 30  如果移动的距离 大于30就跳一个格子
        const point = grid.item.width / 2
        // if (moveLong > point) {
        //     moveDom.offset = moveDom.offset + 1
        //     this.setState({
        //         renderDom: (
        //             <Col
        //                 span={6}
        //                 offset={moveDom.offset}
        //                 draggable
        //                 onDragStart={this.handleDragStart.bind(this)}
        //                 onDrag={this.handleDrag.bind(this)}
        //             >
        //                 格子1
        //             </Col>
        //         )
        //     })
        // }

        console.log(moveLong, point)
    }

    handleDrop(event) {
        event.preventDefault()
    }
    render() {
        return (
            <div
                ref="contain"
                className="draggle-contain"
                onDrop={this.handleDrop.bind(this)}
                onDragOver={this.handleDragOver.bind(this)}
            >
                <Row type="flex" className="grid">
                    {/* {this.state.grid.map((v, k) => (
                        <Col
                            span={6}
                            key={`${k}`}
                            draggable
                            onDragStart={this.handleDragStart.bind(this, k)}
                            onDrag={this.handleDrag.bind(this, k)}
                        >
                            {v}
                        </Col>
                    ))} */}
                    {/* <Col
                        span={6}
                        draggable
                        onDragStart={this.handleDragStart.bind(this)}
                        onDrag={this.handleDrag.bind(this)}
                    >
                        格子1
                    </Col> */}
                    {this.state.renderDom}
                </Row>
            </div>
        )
    }
}

export default Grid
