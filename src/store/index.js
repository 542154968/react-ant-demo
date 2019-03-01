import { combineReducers } from 'redux'

const userData = (state = {}, action) => {
    return Object.assign(state, action.data)
}

const store = combineReducers({
    userData
})

export default store
