import moment from 'moment';
import difference from 'lodash/difference';

export function isSelectedAll(selected, ids) {
    return !!ids.length && !difference(ids, selected).length;
}

export function isObjectCrashed(date) {
    return !!(date && !moment(date).diff(new Date(), 'day'));
}

export function formatDateTime (value) {
    return moment(value).format('DD/MM/YYYY HH:mm');
}

export function formatDateTimeSeconds (value) {
    return moment(value).format('DD/MM/YYYY HH:mm:ss');
}
