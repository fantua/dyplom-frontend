import _get from 'lodash/get';
import { createSelector } from 'reselect';

export const getId = (_, props) => props.id;
export const getLength = (_, props) => props.length;
export const getIds = state => state.statistics.ids;
export const getEntities = state => state.statistics.entities;

export const getObjectIds = createSelector(
    [ getIds, getId ],
    (ids, id) => ids[id] || [],
);

export const getObjectData = createSelector(
    [ getObjectIds, getEntities ],
    (ids, entities) => ids.reduce((result, id) => {
        const entity = entities[id];
        const key = (new Date(entity.createdAt)).getHours();

        result[key] = _get(result, key, 0) + entity.value;

        return result;
    }, {}),
);


export const getObjectLast = createSelector(
    [ getObjectIds, getLength, getEntities ],
    (ids, length, entities) => ids.slice(-length).reverse().map(id => entities[id]),
);
