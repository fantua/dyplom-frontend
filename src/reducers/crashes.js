import * as actions from './../constants';

const initialState = {
    entities: {},
    ids: {},
    isFetching: false,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.CRASHES_REQUEST: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case actions.CRASHES_RECEIVE: {
            const { entities: { statistics: entities }, ids, result } = action.payload;

            return {
                ...state,
                ...result,
                entities: {
                    ...state.entities,
                    ...entities,
                },
                ids: {
                    ...state.ids,
                    ...ids,
                },
                isFetching: false,
            };
        }

        default: {
            return state;
        }
    }
}
