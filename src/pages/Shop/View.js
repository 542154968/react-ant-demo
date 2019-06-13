import React, { Component } from 'react'
import { Input, Tag, Slider } from 'antd'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const type2Component = {
    Input: <Input readOnly />,
    Tag: <Tag>标签</Tag>,
    Slider: <Slider disabled />
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

    // 外部盒子的drag事件
    handleDragOver(event) {
        event.preventDefault()
    }

    // 组件排序处理
    handleSortDragOver(data, event) {
        event.preventDefault()
        // clearTimeout(this.timeId)
        // this.timeId = setTimeout(() => {
        const index = data.index
        // 同一个就不换位置了 动画过程中也不触发交换位置
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
        // 改变后当前index就是换掉顺序之后的index了 不然会一直抖动
        this.curIndex = index
        // 动画时间
        setTimeout(() => {
            this.isMoveing = false
        }, 520)
        // }, 20)
    }

    // 当从左侧组件列表拖拽过来的时候 往视图列表添加组件
    handleDrop(event) {
        // drop文档讲了 必须要阻止默认事件 不然会触发click啥的
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

    // 获取添加的组件的对象
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

    // 当视图中组件开始拖拽时， 排序用的
    handleDragStart(index, event) {
        this.curIndex = index
        // dragStart 一定要设置dataTransfer 不然火狐没法拖拽
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
