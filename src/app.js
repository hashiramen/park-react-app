import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {persistStore, autoRehydrate} from 'redux-persist'

//containers
import Main from './containers/Main'

//saga/store redux
import reducers from './reducers'
import rootSaga from './sagas'

const saga = createSagaMiddleware()
const store = createStore(
    reducers,
    applyMiddleware(saga),
    autoRehydrate()
)
persistStore(store)
saga.run(rootSaga)


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Main />
                </div>
            </Provider>
        );
    }
}

export default App;