import 'url-search-params-polyfill';
import { normalize } from 'normalizr';
import FetchError from './fetch-error';
import User from './user';

const URL = process.env.REACT_APP_API_URL;

export async function fetch(url, options = {}) {
    // fetch polyfill
    const { fetch: _fetch } = window;

    // default options:
    options = Object.assign({contentType: 'json'}, options);

    url = buildUrl(url, options.query);

    if (options.contentType === 'json') {
        // default headers
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        // prepare headers:
        options.headers = Object.assign({}, headers, options.headers);

        // prepare body:
        if (options.body) {
            options.body = JSON.stringify(options.body);
        }
    }

    let response;
    let json;

    try {
        response = await _fetch(url, options);
        json = await response.json();
    } catch (e) {
        throw new FetchError(e.status, e.error, e);
    }

    if (response.ok) {
        return (options.schema) ? normalize(json, options.schema) : json;
    }

    throw new FetchError(response.status, json.error, response);
}


export function buildUrl(_url, query) {
    const queryEncoded = serialize({ ...query, access_token: User.token });

    // build url:
    return `${URL}${_url}?${queryEncoded}`;
}


export function serialize(obj) {
    const searchParams = new URLSearchParams();

    Object.entries(obj).forEach(([key, value]) => {
        searchParams.set(key, (typeof value === 'object') ? JSON.stringify(value) : value);
    });

    return searchParams.toString();
}