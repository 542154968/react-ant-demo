import React, { Component } from 'react'
import { Input, Tag } from 'antd'

const type2Component = {
    Input: <Input readOnly />,
    Tag: <Tag>标签</Tag>
}

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            componentList: []
        }
    }

    handleDragOver(event) {
        event.preventDefault()
        // console.log('拖拽中', event)
    }

    handleDrop(event) {
        event.preventDefault()
        const componentType = event.dataTransfer.getData('text/plain')

        if (componentType) {
            let componentList = this.state.componentList.concat(
                this.getComponetObj(componentType)
            )
            this.setState({
                componentList
            })
        }
    }

    getComponetObj(type) {
        const id = `${type}-${new Date()
            .getTime()
            .toString()
            .slice(5)}`
        return {
            componentId: type2Component[type],
            key: id,
            style: {}
        }
    }

    handleDragStart(event) {}

    render() {
        return (
            <div
                className="view"
                onDragOver={this.handleDragOver.bind(this)}
                onDrop={this.handleDrop.bind(this)}
            >
                {this.state.componentList.map(v => {
                    return (
                        <div
                            draggable
                            key={v.key}
                            onDragStart={this.handleDragStart.bind(this, v)}
                            style={v.style}
                        >
                            {v.componentId}
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default View
