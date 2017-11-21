import * as actions from './actionTypes'

export const login = (payload) => ({
    type: actions.LOGIN,
    payload
})

export const getConfig = (url) => ({
    type: actions.GET_CONFIG,
    payload: {
        entry: url
    }
})
