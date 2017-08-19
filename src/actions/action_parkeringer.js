import { REQUEST_PARKERINGER } from '../actions/types'

export const requestParkeringer = () => {
    return {
        type: REQUEST_PARKERINGER,
        pending: true
    }
}