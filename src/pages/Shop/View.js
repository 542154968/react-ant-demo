import React, { Component } from 'react'
import { Input, Tag } from 'antd'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const type2Component = {
    Input: <Input readOnly />,
    Tag: <Tag>标签</Tag>
}

class View extends Component {
    constructor(props) {
        super(props)
        this.curIndex = 0
        // this.timeId = null
        this.isMoveing = false
        this.state = {
            componentList: []
        }
    }

    handleDragOver(event) {
        event.preventDefault()
    }

    handleSortDragOver(data, event) {
        event.preventDefault()
        // clearTimeout(this.timeId)
        // this.timeId = setTimeout(() => {
        const index = data.index
        // 同一个就不换位置了
        if (index === this.curIndex || this.isMoveing) {
            return
        }
        this.isMoveing = true
        let componentList = this.state.componentList.concat()
        const curComponentData = this.state.componentList[this.curIndex]
        componentList.splice(this.curIndex, 1)
        componentList.splice(index, 0, curComponentData)
        this.setState({
            componentList
        })
        this.curIndex = index
        // 动画时间
        setTimeout(() => {
            this.isMoveing = false
        }, 520)
        // }, 20)
    }

    handleDrop(event) {
        event.preventDefault()
        const componentType = event.dataTransfer.getData('el-type')
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

    handleDragStart(index, event) {
        this.curIndex = index
        event.dataTransfer.setData('el-index', index)
    }

    render() {
        return (
            <div
                className="view"
                onDragOver={this.handleDragOver.bind(this)}
                onDrop={this.handleDrop.bind(this)}
            >
                <TransitionGroup>
                    {this.state.componentList.map((v, k) => {
                        return (
                            <CSSTransition
                                key={v.key}
                                timeout={500}
                                classNames="fade"
                            >
                                <div
                                    onDragOver={this.handleSortDragOver.bind(
                                        this,
                                        {
                                            data: v,
                                            index: k
                                        }
                                    )}
                                    draggable
                                    key={v.key}
                                    onDragStart={this.handleDragStart.bind(
                                        this,
                                        k
                                    )}
                                    style={v.style}
                                    className="sort-item"
                                >
                                    {v.componentId}
                                </div>
                            </CSSTransition>
                        )
                    })}
                </TransitionGroup>
            </div>
        )
    }
}
export default View
