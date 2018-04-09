import { fetch } from '../api';
import { showMessage } from './app';
import * as actions from './../constants';
import * as schemas from '../api/schemas';
import { getIds, getSelected, isSelected, isSelectedAll } from '../selectors/objects';

export const request = () => ({type: actions.OBJECTS_REQUEST});
export const receive = (entities, result = {}) => ({type: actions.OBJECTS_RECEIVE, payload: { entities, result }});
export const receiveParams = (entity) => ({type: actions.OBJECTS_RECEIVE_PARAMS, payload: { entity }});
export const remove = (entities) => ({type: actions.OBJECTS_REMOVE, payload: { entities }});
export const select = (entities) => ({type: actions.OBJECTS_SELECT, payload: { entities }});

export const fetchAll = () => async function (dispatch) {
    dispatch(request());
    const { entities, result: ids } = await fetch('/Objects', {
        schema: schemas.objects,
        query: {
            filter: {
                include: { relation: 'Crashes', scope: { order: 'id DESC', limit: 1 } },
            },
        },
    });

    dispatch(receive(entities, { ids }));
};

export const fetchById = (id) => async function (dispatch) {
    dispatch(request());
    const { entities} = await fetch(`/Objects/${id}`, {
        schema: schemas.object,
        query: {
            filter: {
                include: { relation: 'Crashes', scope: { order: 'id DESC', limit: 1 } },
            },
        },
    });

    dispatch(receive(entities));
};


export const fetchParams = () => async function (dispatch) {
    const data = await fetch('/Objects/params');

    dispatch(receiveParams(data));
};

export const createSuccess = ({ id, name }) => async function (dispatch) {
    dispatch(showMessage(`Об'єкт ${name} (ID: ${id}) успішно створено`, 'success'));
    dispatch(fetchAll());
};

export const create = (data) => async function (dispatch) {
    const { entities, result: id } = await fetch('/Objects', {
        schema: schemas.object,
        method: 'POST',
        body: data,
    });

    dispatch(receive(entities));
    dispatch(createSuccess(entities.objects[id]));
};

export const editSuccess = ({ id, name }) => async function (dispatch) {
    dispatch(showMessage(`Об'єкт ${name} (ID: ${id}) успішно відредаговано`, 'success'));
    dispatch(fetchAll());
};

export const edit = (id, data) => async function (dispatch) {
    const { entities, result } = await fetch(`/Objects/${id}`, {
        schema: schemas.object,
        method: 'PATCH',
        body: data,
    });

    dispatch(receive(entities));
    dispatch(editSuccess(entities.objects[result]));
};

export const deleteSuccess = (count) => async function (dispatch) {
    dispatch(showMessage(`Успішно видалено ${count} об'єкт(-ів)`, 'success'));
    dispatch(fetchAll());
};

export const deleteSelected = () => async function (dispatch, getState) {
    if (!window.confirm("Ви справді хочете видалити вибрані об'єкти?")) return;

    const { objects: { selected } } = getState();
    const { count } = await fetch('/Objects', {
        method: 'DELETE',
        query: {
            where: { id: { inq: selected } },
        },
    });

    dispatch(remove(selected));
    dispatch(deleteSuccess(count));
};

export const toggleSelect = (id) => function (dispatch, getState) {
    const state = getState();
    const selected = getSelected(state);
    const result = (isSelected(state, { id })) ? selected.filter(i => i !== id) : selected.concat(id);

    dispatch(select(result));
};
export const toggleSelectAll = () => function (dispatch, getState) {
    const state = getState();
    const result = (isSelectedAll(state)) ? [] : [ ...getIds(state) ];

    dispatch(select(result));
};
