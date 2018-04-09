import { fetch } from '../api';
import * as actions from './../constants';
import * as schemas from '../api/schemas';

export const request = () => ({type: actions.STATISTICS_REQUEST});
export const receive = (entities, ids, result = {}) => ({type: actions.STATISTICS_RECEIVE, payload: { entities, ids, result }});

export const fetchByDay = (id, value) => async function (dispatch) {
    dispatch(request());
    const start = value.startOf('day').toJSON();
    const end = value.endOf('day').toJSON();

    const { entities, result: ids } = await fetch('/Statistics', {
        schema: schemas.statistics,
        query: {
            filter: {
                where: {
                    objectId: id,
                    createdAt: { between: [ start, end ] },
                },
            },
        },
    });

    dispatch(receive(entities, { [id]: ids }));
};
