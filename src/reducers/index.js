import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { USER_CLEAR } from '../constants';
import appReducer from './app';
import userReducer from './user';
import objectsReducer from './objects';
import crashesReducer from './crashes';
import statisticsReducer from './statistics';

const reducers = combineReducers({
    app: appReducer,
    user: userReducer,
    objects: objectsReducer,
    crashes: crashesReducer,
    statistics: statisticsReducer,
    routing: routerReducer,
});

const rootReducer = (state, action) => {
    if (action.type === USER_CLEAR) {
        const { routing } = state;
        state = { routing };
    }

    return reducers(state, action);
};

export default rootReducer;
