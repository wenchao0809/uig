#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var path_1 = require("path");
var chalk_1 = __importDefault(require("chalk"));
var program = __importStar(require("commander"));
// Todo: 增加 checkUpdate
(function () {
    program
        .option('--type <typeName>', '设置类型')
        .option('--apiUrl <apiUrl>', '设置Rap平台后端地址')
        .option('--rapUrl <rapUrl>', '设置Rap平台前端地址')
        .option('--rapperPath <rapperPath>', '设置生成代码所在目录')
        .option('--resSelector <resSelector>', '响应数据类型转换配置');
    program.parse(process.argv);
    var rapperConfig;
    if (program.type && program.apiUrl && program.rapUrl) {
        /** 通过 scripts 配置 */
        rapperConfig = {
            type: program.type,
            apiUrl: program.apiUrl,
            rapUrl: program.rapUrl,
            rapperPath: path_1.resolve(process.cwd(), program.rapperPath || './src/models/rapper/'),
        };
        if (program.resSelector) {
            rapperConfig = __assign(__assign({}, rapperConfig), { resSelector: program.resSelector });
        }
    }
    else {
        /** 通过 package.json 的 rapper 字段配置 */
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        var packageConfig = require(path_1.resolve(process.cwd(), './package.json'));
        if (!packageConfig.rapper) {
            console.log(chalk_1.default.yellow('尚未在 package.json 中配置 rapper，请参考配置手册'));
            process.exit(1);
        }
        var _a = packageConfig.rapper, projectId = _a.projectId, type = _a.type, rapUrl = _a.rapUrl, apiUrl = _a.apiUrl, rapperPath = _a.rapperPath, resSelector = _a.resSelector;
        if (!projectId) {
            console.log(chalk_1.default.yellow('尚未在 package.json 中配置 rapper.projectId'));
            process.exit(1);
        }
        rapperConfig = {
            type: type || 'redux',
            apiUrl: apiUrl + "/repository/get?id=" + projectId,
            rapUrl: rapUrl,
            rapperPath: path_1.resolve(process.cwd(), rapperPath || './src/models/rapper/'),
        };
        if (resSelector) {
            rapperConfig = __assign(__assign({}, rapperConfig), { resSelector: resSelector });
        }
    }
    index_1.rapper(rapperConfig);
})();
