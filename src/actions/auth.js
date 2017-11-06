import { AUTH, LOGIN } from './actionTypes'
import cookie from 'js-cookie'
export const login = (payload) => ({
    type: LOGIN,
    payload
})

export const check = (payload) => ({
    type: AUTH,
    payload: { token: cookie.get('token') }
})