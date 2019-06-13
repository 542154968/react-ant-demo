import React, { Component } from 'react'
import { Input, Tag, Slider } from 'antd'

class ComList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            componentList: [
                {
                    componentId: <Input readOnly />,
                    type: 'Input'
                },
                {
                    componentId: <Tag>标签</Tag>,
                    type: 'Tag'
                },
                {
                    componentId: <Slider disabled />,
                    type: 'Slider'
                }
            ]
        }
    }

    // 开始拖拽时，先设置好要传给视图的type
    handleDragStart(data, event) {
        event.dataTransfer.setData('el-type', data.type)
    }

    render() {
        return (
            <ul className="com-list">
                {this.state.componentList.map(v => {
                    return (
                        <li
                            draggable
                            key={v.type}
                            onDragStart={this.handleDragStart.bind(this, v)}
                        >
                            {v.componentId}
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default ComList
