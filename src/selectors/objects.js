import { createSelector } from 'reselect';
import * as utils from '../utils';

export const getId = (_, props) => props.id;
export const getIds = state => state.objects.ids;
export const getParams = state => state.objects.params;
export const getSelected = state => state.objects.selected;
export const getEntities = state => state.objects.entities;

export const getEntity = createSelector(
    [ getId, getEntities ],
    (id, entities) => entities[id],
);

export const isSelected = createSelector(
    [ getId, getSelected ],
    (id, selected) => selected.includes(id),
);

export const isSelectedAll = createSelector(
    [ getSelected, getIds ],
    (selected, ids) => utils.isSelectedAll(selected, ids),
);

export const isSelectedAny = createSelector(
    getSelected,
    selected => !!selected.length,
);
