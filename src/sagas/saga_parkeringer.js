import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import axios from 'axios'

//types
import { REQUEST_PARKERINGER, RECEIVE_PARKERINGER, ERROR_PARKERINGER } from '../actions/types'


export function* watcherFetchParkeringer(){
    yield takeEvery(REQUEST_PARKERINGER, requestParkeringer)
}

export function* requestParkeringer(action){
    try 
    {
        const { data } = yield call(axios.get, 'http://data.kk.dk/parking/latest/60', action)
        yield put({type: RECEIVE_PARKERINGER, payload: data, pending: false})
    } 
    catch (error) 
    {
        yield put({type: ERROR_PARKERINGER, pending: false})
    }
}