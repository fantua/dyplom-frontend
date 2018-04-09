import { createSelector } from 'reselect';

export const getId = (_, props) => props.id;
export const getIds = state => state.crashes.ids;
export const getEntities = state => state.crashes.entities;

export const getObjectIds = createSelector(
    [ getIds, getId ],
    (ids, id) => ids[id] || [],
);

export const getObjectEntities = createSelector(
    [ getObjectIds, getEntities ],
    (ids, entities) => ids.map(id => entities[id]),
);
