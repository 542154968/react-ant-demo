import React, { Component } from 'react'
import { Input, Tag } from 'antd'

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
                }
            ]
        }
    }

    handleDragStart(data, event) {
        console.log(event, data)
        event.dataTransfer.setData('text/plain', data.type)
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
