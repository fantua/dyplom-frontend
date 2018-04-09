import { push, replace } from 'react-router-redux';
import IFetchError from '../api/fetch-error';
import * as actions from '../constants';
import * as userActions from './user';

export const request = () => ({type: actions.APP_REQUEST});
export const requestEnd = () => ({type: actions.APP_REQUEST_END});
export const clearMessage = () => ({type: actions.APP_CLEAR_MESSAGE});

export const showMessage = (message, messageType = 'danger') => ({
    type: actions.APP_SHOW_MESSAGE,
    payload: { message, messageType }
});

/**
 *
 * Dispatch push or replace action with message
 *
 * @param {string|object} path
 * @param {object=} config
 * @param {string=} config.message
 * @param {string=} [config.messageType=error]
 * @param {boolean=} [config.replace=false]
 *
 */

export const redirectTo = (path, config = {}) => function (dispatch) {
    let parameters = {
        pathname: '',
        state: {}
    };

    if (typeof path === 'string') {
        parameters.pathname = path;
    } else {
        if (!path.hasOwnProperty('pathname')) {
            throw new Error('Missing pathname parameter');
        }

        parameters = {
            ...parameters,
            ...path
        };
    }

    if (config.replace) {
        dispatch(replace(parameters));
    } else {
        dispatch(push(parameters));
    }

    if (config.hasOwnProperty('message')) {
        const messageType = (config.hasOwnProperty('messageType')) ? config.messageType : 'error';
        dispatch(showMessage(config.message, messageType));
    }
};

export const fetchError = (e, action) => function (dispatch, getState) {
    if (!(e instanceof IFetchError)) return;

    switch (e.status) {
        case 401: {
            switch (e.json.code) {
                // Unauthorized:
                case 'AUTHORIZATION_REQUIRED': {
                    const { routing: { location  } } = getState();

                    if (location.pathname.startsWith('/login')) {
                        break;
                    }

                    const path = {
                        pathname: '/login',
                        state: { from: location }
                    };

                    dispatch(userActions.clearData());
                    dispatch(redirectTo(path, {
                        message: 'Error: Your session has expired',
                        messageType: 'warning',
                        replace: true
                    }));
                    break;
                }

                case 'LOGIN_FAILED': {
                    dispatch(showMessage('Помилка: E-mail або пароль введені невірно'));
                    break;
                }

                default: {
                    console.log(e);
                    dispatch(showMessage(`Error: ${e.json.message}`));
                    break;
                }
            }
            break;
        }

        case 404: {
            dispatch(showMessage('The page you are looking for can\'t be found'));
            break;
        }

        // Validation errors:
        case 422: {
            const { name, message } = e.json;
            dispatch(showMessage(`${name}: ${message}`));
            break;
        }

        case 503: {
            dispatch(showMessage('Error: Service Temporarily Unavailable'));
            break;
        }

        default: {
            dispatch(showMessage('Error: Something went wrong'));
            console.error(e);
        }
    }
};