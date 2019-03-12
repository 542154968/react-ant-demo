import React, { Component } from 'react'

class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            province: [
                {
                    name: '安徽',
                    id: 0
                },
                {
                    name: '河南',
                    id: 1
                }
            ],
            city: [
                {
                    name: '合肥',
                    id: 2,
                    parentId: 0
                },
                {
                    name: '阜阳',
                    id: 3,
                    parentId: 0
                },
                {
                    name: '郑州',
                    id: 4,
                    parentId: 1
                }
            ],
            currentCity: [],
            provinceId: 0,
            cityid: 2
        }
    }

    componentWillMount() {
        this.setProvinceData(0)
    }

    provinceChange(event) {
        const id = Number(event.target.value)
        this.setProvinceData(id)
    }
    cityChange(event) {
        this.setCityData(Number(event.target.value))
    }

    setCityData(id) {
        this.setState({
            cityid: id
        })
        // this.setProvinceData({
        //     cityid: event
        //         ? Number(event.target.value)
        //         : this.state.currentCity[0].id
        // })
    }

    setProvinceData(id) {
        const cityArr = this.state.city.filter(v => id === v.parentId)
        this.setState({
            currentCity: cityArr,
            provinceId: id
        })
        this.setCityData(cityArr[0] ? cityArr[0].id : null)
    }

    render() {
        return (
            <>
                <label>
                    省份：
                    <select
                        value={this.state.provinceId}
                        onChange={this.provinceChange.bind(this)}
                    >
                        {this.state.province.map(v => (
                            <option key={v.id} value={v.id}>
                                {v.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    城市：
                    <select
                        value={this.state.cityId}
                        onChange={this.cityChange.bind(this)}
                    >
                        {this.state.currentCity.map(v => (
                            <option key={v.id} value={v.id}>
                                {v.name}
                            </option>
                        ))}
                    </select>
                </label>
            </>
        )
    }
}

export default Select
