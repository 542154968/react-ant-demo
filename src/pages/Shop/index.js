import React, { Component } from 'react'
import './index.styl'
import Components from './Components'
import View from './View'

class Shop extends Component {
    render() {
        return (
            <div className="shop">
                <Components />
                <View />
            </div>
        )
    }
}

export default Shop
