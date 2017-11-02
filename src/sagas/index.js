import { takeEvery } from 'redux-saga/effects'
import { put, push, call, take, fork, cancel, cancelled } from 'redux-saga/effects'



export default function* sagas() {
    yield takeEvery("USER_LOGIN", function* (action) {

        try {
            put({ type: "USER_LOGIN_LOADING" })

            const { username, password } = action.payload


            if (username == password) {
                localStorage.setItem('username', username)
                yield put({
                    type: 'USER_LOGIN_SUCCESS'
                })

                yield put(push('/'))

                return Promise.resolve()

            } else {
                yield put({
                    type: 'USER_LOGIN_FAILURE',
                    meta: { auth: true },
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