import _get from 'lodash/get';
import { schema } from 'normalizr';

export const crash = new schema.Entity('crashes');
export const object = new schema.Entity('objects', {
    Crashes: [ crash ],
}, {
    processStrategy: (entity) => ({
        ...entity,
        lastCrashAt: _get(entity, 'Crashes[0].createdAt', null),
    })
});
export const statistic = new schema.Entity('statistics');

export const crashes = new schema.Array(crash);
export const objects = new schema.Array(object);
export const statistics = new schema.Array(statistic);
