import { fetch } from '../api';
import { redirectTo } from './app';
import * as actions from '../constants';
import User from '../api/user';

export const clear = (result = {}) => ({type: actions.USER_CLEAR, payload: { result }});
export const receive = (entity, result = {}) => ({type: actions.USER_RECEIVE, payload: { entity, result }});

export const loginSuccess = (token, user) => function (dispatch, getState) {
    const { routing: { location } } = getState();

    User.saveToken(token);
    dispatch(receive(user));

    if (location.state && location.state.from) {
        // handle return url if exist:
        dispatch(redirectTo(location.state.from.pathname));
    } else {
        // handle index route for role:
        dispatch(redirectTo('/'));
    }
};

export const fetchLogin = (email, password) => async function (dispatch) {
    const { id: token, user } = await fetch('/Accounts/login', {
        method: 'POST',
        body: { email, password },
        query: {
            include: 'User',
        },
    });

    dispatch(loginSuccess(token, user));
};

export const clearData = () => function (dispatch) {
    User.clear();
    dispatch(clear());
};

export const logout = () => function (dispatch) {
    dispatch(clearData());
    dispatch(redirectTo('/login'));
};

export const fetchData = () => async function (dispatch) {
    const data = await fetch('/Accounts/me');

    dispatch(receive(data));
};
