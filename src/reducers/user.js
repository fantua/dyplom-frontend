import * as actions from './../constants';

const initialState = {
    entity: null,
    isFetching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.USER_RECEIVE: {
            const { entity } = action.payload;

            return {
                ...state,
                entity,
                isFetching: false,
            };
        }

        default: {
            return state;
        }
    }
}
