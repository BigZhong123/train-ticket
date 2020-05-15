import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import reducers from './reducers.js';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers(reducers),
    {

    },
    applyMiddleware(thunk)
);