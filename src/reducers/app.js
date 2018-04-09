import { LOCATION_CHANGE } from 'react-router-redux';
import * as actions from './../constants';

const initialState = {
    message: null,
    messageType: null,
    isFetching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.APP_REQUEST: {
            return {
                ...state,
                isFetching: true
            };
        }

        case actions.APP_REQUEST_END: {
            return {
                ...state,
                isFetching: false
            };
        }

        case actions.APP_SHOW_MESSAGE: {
            const {message, messageType} = action.payload;
    
            return {
                ...state,
                message,
                messageType
            };
        }

        case LOCATION_CHANGE:
        case actions.APP_CLEAR_MESSAGE: {
            const {message, messageType} = initialState;

            return {
                ...state,
                message,
                messageType
            };
        }

        default: {
            return state;
        }
    }
}
