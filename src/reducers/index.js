import { combineReducers } from 'redux'


import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import auth from './auth'

const user = (state = { firstName: 'aaron', sex: 'male', favoriteColor: '00ff00' }, action) => {
    switch (action.type) {
        case 'LOAD':
            return { ...action.payload }
        default:
            return state
    }
}

export default combineReducers({
    router: routerReducer,
    form: formReducer,
    user,
    auth
})