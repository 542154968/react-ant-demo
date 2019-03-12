import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Button } from 'antd'
import HTSelect from '@components/Select'
import Child from './Child'
import './index.styl'

class Animation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { id: 1, text: 'Buy eggs' },
                { id: 2, text: 'Pay bills' },
                { id: 3, text: 'Invite friends over' },
                { id: 4, text: 'Fix the TV' }
            ]
        }
    }

    hanldeChildChange(data) {
        console.log(this)
    }

    render() {
        const { items } = this.state
        return (
            <div>
                <HTSelect ref="htSelect" />
                <TransitionGroup className="todo-list">
                    {items.map(({ id, text }) => (
                        <CSSTransition key={id} timeout={500} classNames="fade">
                            <div>
                                <Button
                                    onClick={() => {
                                        this.setState(state => ({
                                            items: state.items.filter(
                                                item => item.id !== id
                                            )
                                        }))
                                    }}
                                >
                                    &times;
                                </Button>
                                {text}
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                <Button
                    type="button"
                    onClick={() => {
                        const text = prompt('Enter some text')
                        if (text) {
                            this.setState(state => ({
                                items: [...state.items, { id: 1123, text }]
                            }))
                        }
                    }}
                >
                    Add Item
                </Button>
                <Child onParentEvent={this.hanldeChildChange.bind(this)} />
            </div>
        )
    }
}
export default Animation
