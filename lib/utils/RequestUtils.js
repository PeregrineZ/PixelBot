'use strict';
const request = require('request');
const querystring = require('querystring');
const auth = require('../../auth.json');
const API_HOST = 'https://api.hypixel.net';

export default class RequestUtils {
    static _buildPath(path, query) {
        const params = query || null;

        const _query = querystring.stringify(Object.assign({}, params, {
            key: auth.key,
        }));

        return `${API_HOST}/${path}?${_query}`;
    }

    _sendRequest(path, query, resultField, callback) {
        request(RequestUtils._buildPath(path, query), (error, res, body) => {
            let data = null;

            if (!error) {
                try {
                    data = JSON.parse(body);
                } catch (ex) {
                    return callback(new Error('malformed json'), null);
                }
            }

            if (data) {
                if (data.success) {
                    return callback(error, resultField ? data[resultField] : data);
                }

                return callback(new Error(data.err), null);
            }

            return callback(error, data);
        });
    }

    _request(path, query, resultField, callback) {
        if (callback) {
            return this._sendRequest(path, query, resultField, callback);
        }

        return new Promise((resolve, reject) => {
            this._sendRequest(path, query, resultField, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
}