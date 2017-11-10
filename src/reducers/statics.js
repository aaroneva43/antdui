import { PENDING, SUCCESS, FAILURE, GET_STATICS, GET_MENU } from '../actions/actionTypes'
import reducerGenerator from './reducerGenerator'

const initialState = {}

export default reducerGenerator([GET_STATICS, GET_MENU], initialState, {
    [GET_STATICS]: (state, action) => {
        return {
            ...state
        }
    },
    [`${GET_STATICS}/${SUCCESS}`]: (state, action) => {
        return {
            ...state,
            ...action.payload
        }
    },
    [`${GET_STATICS}/${FAILURE}`]: (state, action) => {
        return {
            ...state
        }
    },
    [GET_MENU]: (state, action) => {
        return {
            ...state,
            menu_data: action.payload
        }
    }
})