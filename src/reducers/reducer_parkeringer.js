import { REQUEST_PARKERINGER, RECEIVE_PARKERINGER, ERROR_PARKERINGER} from '../actions/types'

import _ from 'lodash'

const initialState = {
    pending: false,
    results: {}
}

export const parkeringer = (state = initialState, action) => {
    const { pending, payload } = action
    switch(action.type){
        case REQUEST_PARKERINGER:
            return { ...state, pending }
        case RECEIVE_PARKERINGER:
            let grouped = _.groupBy(payload.results, prk => prk.providerId)
            Object.keys(grouped).forEach((provider, index) => {
                grouped[provider] = _.keyBy(grouped[provider], prk => prk.prid)
            })
            return { ...state, pending, results: { ...grouped }  }
        case ERROR_PARKERINGER:
            return { ...state, pending }
    }

    return state
}