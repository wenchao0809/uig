"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api;
api = {
    version: {
        editionList: function (data) {
            return axios.get('/edition/list', data);
        },
    },
    app: {
        appList: function (data) {
            return axios.post('/app/list', data);
        },
    },
};
exports.default = api;
