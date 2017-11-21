import { takeEvery } from 'redux-saga/effects'
import { put, call, take, fork, cancel, cancelled } from 'redux-saga/effects'
import cookie from 'js-cookie'

import { SUCCESS, FAILURE, PENDING, LOGIN, AUTH, GET_STATICS } from '../actions/actionTypes'
import { getMenu } from '../actions/statics'

import api from '../api'

import _ from 'lodash'

import { extendNode } from '../services/Data';



export default function* sagas() {

    // LOGIN
    yield takeEvery(LOGIN, function* (action) {
        try {
            put({ type: `${LOGIN}/${PENDING}` })

            const { username, password } = action.payload

            const res = yield call(api.login, { username: username, password: password })

            if (res.success == true) {
                cookie.set('token', res.result.token)
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

    // AUTH
    yield takeEvery(AUTH, function* (action) {
        try {
            put({ type: `${AUTH}` })

            const res = yield call(api.auth, { token: cookie.get('token') })

            if (res.success == true) {

                // cookie.set('token', res.result)

                yield put({ type: `${AUTH}/${SUCCESS}`, payload: { token: res.result.token } })

            } else {
                yield put({ type: `${AUTH}/${FAILURE}`, payload: res.result.message })

            }


        } catch (e) {
            yield put({ type: `${AUTH}/${FAILURE}`, payload: e })
        }
    })

    // GET STATICS
    yield takeEvery(GET_STATICS, function* (action) {
        try {
            put({ type: `${GET_STATICS}` })

            let statics = {}
            action.payload = _.castArray(action.payload)

            for (let i = 0; i < action.payload.length; i++) {
                let itm = action.payload[i]
                let res = yield call(api.statics, { url: itm.url })
                statics[itm.entry] = res.result
            }

            // generate gid_node_local
            const { gid_node, macro_gid, macro_name, module_fields, conditions } = statics

            if (gid_node && macro_gid && macro_name && module_fields && conditions) {
                statics['gid_node_map'] = yield call(extendNode, gid_node, macro_gid, macro_name, module_fields, conditions)

            }
            yield put({ type: `${GET_STATICS}/${SUCCESS}`, payload: statics })

            // generate menu_data
            if (statics.menu && statics.menu_pieces) {
                yield put(getMenu(statics.menu, statics.menu_pieces))
            } else {
                console.error('menu generation failed')
            }




        } catch (e) {
            yield put({ type: `${GET_STATICS}/${FAILURE}`, payload: e })
        }
    })
}