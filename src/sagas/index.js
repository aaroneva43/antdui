import { takeEvery } from 'redux-saga/effects'
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects'
import cookie from 'js-cookie'

import { PENDING, SUCCESS, FAILURE } from '../actions/actionTypes'
import * as actions from '../actions/actionTypes'
import api from '../api'



export default function* sagas() {
    yield takeEvery(actions.LOGIN, function* (action) {

        try {
            put({ type: `${actions.LOGIN}/${PENDING}` })

            const { username, password } = action.payload

            const res = yield call(api.auth, { params: { username: username, password: password } })

            if (res.success == true) {

                cookie.set('token', res.result)
                yield put({ type: `${actions.LOGIN}/${SUCCESS}` })

                // yield put(push('/'))

                return Promise.resolve()

            } else {
                yield put({
                    type: `${actions.LOGIN}/${FAILURE}`
                });
            }




        } catch (e) {
            yield put({
                type: 'USER_LOGIN_FAILURE',
                error: e,
                meta: { auth: true },
            })
        }



    })
}