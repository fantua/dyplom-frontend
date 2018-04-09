import _omit from 'lodash/omit';
import * as actions from './../constants';

const initialState = {
    entities: {},
    params: null,
    selected: [],
    ids: [],
    isFetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.OBJECTS_REQUEST: {
            return {
                ...state,
                isFetching: true,
            };
        }


        case actions.OBJECTS_RECEIVE_PARAMS: {
            const { entity } = action.payload;

            return {
                ...state,
                params: entity,
            };
        }

        case actions.OBJECTS_RECEIVE: {
            const { entities: { objects: entities }, result } = action.payload;

            return {
                ...state,
                ...result,
                entities: {
                    ...state.entities,
                    ...entities
                },
                selected: [],
                isFetching: false,
            };
        }

        case actions.OBJECTS_REMOVE: {
            const { entities } = action.payload;

            return {
                ...state,
                entities: _omit(state.entities, entities),
                ids: state.selected.filter(id => !entities.includes(id)),
            };
        }

        case actions.OBJECTS_SELECT: {
            const { entities } = action.payload;

            return {
                ...state,
                selected: entities,
            };
        }

        default: {
            return state;
        }
    }
}
