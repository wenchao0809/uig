"use strict";
/* md5: 4b6b5310c080a066d432a5bd24eae4ef */
/* Rap仓库id: 254918 */
/* Rapper版本: 1.0.3-beta.2 */
/* eslint-disable */
/* tslint:disable */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFetch = exports.createFetch = exports.fetch = void 0;
/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=254918
 */
var request_1 = require("./request");
Object.defineProperty(exports, "createFetch", { enumerable: true, get: function () { return request_1.createFetch; } });
var commonLib = __importStar(require("rap/runtime/commonLib"));
var defaultFetch = commonLib.defaultFetch;
exports.defaultFetch = defaultFetch;
var fetch = request_1.createFetch({});
exports.fetch = fetch;
