import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import asyncCatch from 'redux-async-catch';
import thunk from 'redux-thunk';
import { fetchError } from '../actions/app';
import reducers from './../reducers';

export default function configureStore(initialState, history) {
    const enhancer = compose(
        applyMiddleware(
            asyncCatch(fetchError),
            thunk,
            routerMiddleware(history)
        )
    );

    return createStore(
        reducers,
        initialState,
        enhancer
    );
}