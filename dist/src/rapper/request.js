"use strict";
/* md5: 331bea4675f9138d64dea4f693160fd0 */
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
exports.createFetch = void 0;
/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=254918
 */
var commonLib = __importStar(require("rap/runtime/commonLib"));
function createFetch(fetchConfig) {
    var rapperFetch = commonLib.getRapperRequest(fetchConfig);
    return {
        /**
         * 接口名：editionList
         * Rap 地址: http://rap2.taobao.org/repository/editor?id=254918&mod=382279&itf=1582917
         * @param req 请求参数
         * @param extra 请求配置项
         */
        'GET/edition/list': function (req, extra) {
            return rapperFetch({
                url: '/edition/list',
                method: 'GET',
                params: req,
                extra: extra,
            });
        },
        /**
         * 接口名：appList
         * Rap 地址: http://rap2.taobao.org/repository/editor?id=254918&mod=385500&itf=1597586
         * @param req 请求参数
         * @param extra 请求配置项
         */
        'POST/app/list': function (req, extra) {
            return rapperFetch({
                url: '/app/list',
                method: 'POST',
                params: req,
                extra: extra,
            });
        },
    };
}
exports.createFetch = createFetch;
