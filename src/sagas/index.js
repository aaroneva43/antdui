import { takeEvery } from 'redux-saga/effects'
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects'
import cookie from 'js-cookie'

import { SUCCESS, FAILURE, PENDING, LOGIN, AUTH } from '../actions/actionTypes'

import api from '../api'



export default function* sagas() {
    yield takeEvery(LOGIN, function* (action) {

        try {
            put({ type: `${LOGIN}/${PENDING}` })

            const { username, password } = action.payload

            const res = yield call(api.auth, { username: username, password: password })

            if (res.success == true) {
                cookie.set('token', res.result)
                yield put({ type: `${LOGIN}/${SUCCESS}` })

            } else {
                yield put({ type: `${LOGIN}/${FAILURE}` })

            }

        } catch (e) {
            yield put({
                type: `${LOGIN}/${FAILURE}`,
                error: e
            })

        }



    })

    yield takeEvery(AUTH, function* (action) {
        try {
            put({ type: `${AUTH}` })

            const res = yield call(api.auth, { token: cookie.get('token') })

            if (res.success == true) {

                cookie.set('token', res.result)

                yield put({ type: `${AUTH}/${SUCCESS}`, payload: { token: res.result.token } })

            } else {
                yield put({ type: `${AUTH}/${FAILURE}`, payload: res.result.message })

            }


        } catch (e) {
            yield put({ type: `${AUTH}/${FAILURE}`, payload: e })
        }
    })
}