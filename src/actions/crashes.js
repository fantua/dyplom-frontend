import { fetch } from '../api';
import * as actions from './../constants';
import * as schemas from '../api/schemas';

export const request = () => ({type: actions.CRASHES_REQUEST});
export const receive = (entities, ids, result = {}) => ({type: actions.CRASHES_RECEIVE, payload: { entities, ids, result }});

export const fetchByObject = (id) => async function (dispatch) {
    dispatch(request());
    const { entities, result: ids } = await fetch('/Crashes', {
        schema: schemas.statistics,
        query: {
            filter: {
                where: { objectId: id },
            },
        },
    });

    dispatch(receive(entities, { [id]: ids }));
};
