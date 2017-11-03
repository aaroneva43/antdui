import * as actions from './actionTypes'
import cookie from 'js-cookie'
export const login = (payload) => ({
    type: actions.LOGIN,
    payload
})

export const check = (payload) => ({
    type: actions.AUTH,
    payload: { token: cookie.get('token') }
})