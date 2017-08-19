import { watcherFetchParkeringer } from './saga_parkeringer'

//root saga
//initializiation of watchers
export function* rootSaga() {
    yield [
        watcherFetchParkeringer()
    ]
}

export default rootSaga;