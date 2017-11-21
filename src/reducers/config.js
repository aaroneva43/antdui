import { GET_CONFIG, PENDING, SUCCESS, FAILURE } from '../actions/actionTypes'
import reducerGenerator from './reducerGenerator'

const initialState = {
    pending: true,
    success: false,
    gid: null,
    customGid: null,
    widget: null,
    error: null,
    payload: {}
}

const auth = reducerGenerator(GET_CONFIG, initialState, {
    [`${GET_CONFIG}`]: (state, action) => {
        return {
            ...state,
            pending: true
        }
    },
    [`${GET_CONFIG}/${SUCCESS}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            payload: action.payload.result
        }
    },
    [`${GET_CONFIG}/${FAILURE}`]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: action.payload
        }
    }

})

export default auth