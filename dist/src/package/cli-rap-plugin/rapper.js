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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var formatter_1 = require("json-schema-to-typescript/dist/src/formatter");
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var types_1 = require("./types");
var base_creator_1 = require("./core/base-creator");
var redux_1 = __importDefault(require("./redux"));
var utils_1 = require("./utils");
var tools_1 = require("./core/tools");
var scanFile_1 = require("./core/scanFile");
var url = require("url");
var latest_version_1 = __importDefault(require("latest-version"));
var semver = __importStar(require("semver"));
var ora = __importStar(require("ora"));
var packageJson = require('../package.json');
function default_1(_a) {
    var type = _a.type, _b = _a.rapUrl, rapUrl = _b === void 0 ? 'http://rap2.taobao.org' : _b, _c = _a.apiUrl, apiUrl = _c === void 0 ? 'http://rap2api.taobao.org' : _c, _d = _a.rapperPath, rapperPath = _d === void 0 ? './src/rapper' : _d, _e = _a.urlMapper, urlMapper = _e === void 0 ? function (t) { return t; } : _e, codeStyle = _a.codeStyle, _f = _a.resSelector, resSelector = _f === void 0 ? 'type ResSelector<T> = T' : _f;
    return __awaiter(this, void 0, void 0, function () {
        var rapperVersion, spinner, newVersion, err_1, apiParams, projectId, oldFilesRapperVersion, changeFiles, confirmed, outputFiles, interfaces, e_1, scanResult, confirmed, Creator, indexCodeArr, indexStr, requestStr;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    rapperVersion = packageJson.version;
                    spinner = ora(chalk_1.default.grey('rapper: 开始检查版本'));
                    spinner.start();
                    _g.label = 1;
                case 1:
                    _g.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, latest_version_1.default('rap')];
                case 2:
                    newVersion = _g.sent();
                    if (semver.lt(rapperVersion, newVersion)) {
                        spinner.warn(chalk_1.default.yellow('rapper 升级提示: '));
                        console.log("  \u5F53\u524D\u7248\u672C: " + chalk_1.default.grey(packageJson.version));
                        console.log("  \u6700\u65B0\u7248\u672C: " + chalk_1.default.cyan(newVersion));
                        // console.log(
                        //   `  运行 ${chalk.green(`npm i -D ${packageJson.name}@latest && npm run rapper`)} 即可升级`,
                        // );
                    }
                    else {
                        spinner.succeed(chalk_1.default.grey('rapper: 当前是最新版'));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _g.sent();
                    spinner.warn("rapper \u7248\u672C\u68C0\u67E5\u5931\u8D25\uFF0C" + err_1.message);
                    return [3 /*break*/, 4];
                case 4:
                    /** 参数校验 */
                    spinner.start(chalk_1.default.grey('rapper: 开始校验参数'));
                    if (!type) {
                        return [2 /*return*/, new Promise(function () { return spinner.fail(chalk_1.default.red('rapper: 请配置 type 参数')); })];
                    }
                    else if (!['normal', 'redux'].includes(type)) {
                        return [2 /*return*/, new Promise(function () { return spinner.fail(chalk_1.default.red('rapper: type 参数配置错误，请重新配置')); })];
                    }
                    spinner.succeed(chalk_1.default.grey('rapper: 参数校验成功'));
                    apiParams = url.parse(apiUrl, true).query;
                    projectId = parseInt(Array.isArray(apiParams.id) ? apiParams.id[0] : apiParams.id);
                    json_schema_to_typescript_1.DEFAULT_OPTIONS.style = __assign(__assign({}, json_schema_to_typescript_1.DEFAULT_OPTIONS.style), { singleQuote: true, semi: false, trailingComma: types_1.TRAILING_COMMA.ES5 });
                    if (codeStyle && typeof codeStyle === 'object') {
                        json_schema_to_typescript_1.DEFAULT_OPTIONS.style = __assign({}, codeStyle);
                    }
                    rapperPath = rapperPath.replace(/\/$/, '');
                    rapUrl = rapUrl.replace(/\/$/, '');
                    apiUrl = apiUrl.replace(/\/$/, '');
                    oldFilesRapperVersion = scanFile_1.findRapperVersion(rapperPath);
                    if (oldFilesRapperVersion && semver.lt(rapperVersion, oldFilesRapperVersion)) {
                        return [2 /*return*/, new Promise(function () {
                                spinner.fail(chalk_1.default.red('rapper 执行失败: 当前环境 rapper 版本低于已经生成的模板文件版本，为避免低版本覆盖高版本，请您升级'));
                                console.log("  \u5F53\u524D\u7248\u672C: " + chalk_1.default.grey(rapperVersion));
                                console.log("  \u5F53\u524D\u6A21\u677F\u6587\u4EF6\u7248\u672C: " + chalk_1.default.cyan(oldFilesRapperVersion));
                                console.log("  \u8FD0\u884C " + chalk_1.default.green("npm i -D " + packageJson.name + "@" + oldFilesRapperVersion + " && npm run rapper") + " \u5373\u53EF\u5347\u7EA7\u5230\u76F8\u540C\u7248\u672C");
                            })];
                    }
                    /** 扫描找出生成的模板文件是否被手动修改过 */
                    spinner.start(chalk_1.default.grey('rapper: 检测模板代码是否被修改'));
                    changeFiles = scanFile_1.findChangeFiles(rapperPath);
                    if (!changeFiles.length) return [3 /*break*/, 6];
                    spinner.warn(chalk_1.default.yellow('rapper: 检测到如下模板代码被修改'));
                    changeFiles.forEach(function (str) {
                        console.log(chalk_1.default.yellow("    " + str));
                    });
                    return [4 /*yield*/, utils_1.templateFilesOverwriteConfirm()];
                case 5:
                    confirmed = (_g.sent()).confirmed;
                    if (!confirmed) {
                        console.log(chalk_1.default.red('更新操作已终止'));
                        process.exit(0);
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 7];
                case 6:
                    spinner.succeed(chalk_1.default.grey('rapper: 模板代码未被修改'));
                    _g.label = 7;
                case 7:
                    outputFiles = [];
                    interfaces = [];
                    spinner.start(chalk_1.default.grey('rapper: 正在从 Rap 平台获取接口信息...'));
                    _g.label = 8;
                case 8:
                    _g.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, tools_1.getInterfaces(apiUrl)];
                case 9:
                    interfaces = _g.sent();
                    spinner.succeed(chalk_1.default.grey('rapper: 获取接口信息成功'));
                    return [3 /*break*/, 11];
                case 10:
                    e_1 = _g.sent();
                    return [2 /*return*/, new Promise(function () { return spinner.fail(chalk_1.default.red("rapper: \u83B7\u53D6\u63A5\u53E3\u4FE1\u606F\u5931\u8D25\uFF0C" + e_1)); })];
                case 11:
                    interfaces = tools_1.uniqueItfs(tools_1.getIntfWithModelName(interfaces, urlMapper));
                    /** Rap 接口引用扫描，如果 projectId 更改了就不再扫描，避免过多的报错信息展现在Terminal */
                    spinner.start(chalk_1.default.grey('rapper: 正在扫描接口依赖'));
                    if (!(utils_1.getOldProjectId(rapperPath) === String(projectId))) return [3 /*break*/, 15];
                    scanResult = scanFile_1.findDeleteFiles(interfaces, [rapperPath]);
                    if (!(scanResult.length && scanResult.length < 5)) return [3 /*break*/, 13];
                    spinner.warn(chalk_1.default.yellow('rapper: 如下文件使用了已被 Rap 删除或修改的接口'));
                    scanResult.forEach(function (_a) {
                        var key = _a.key, filePath = _a.filePath, start = _a.start, line = _a.line;
                        console.log(chalk_1.default.yellow("    \u63A5\u53E3: " + key + ", \u6240\u5728\u6587\u4EF6: " + filePath + ":" + line + ":" + start));
                    });
                    return [4 /*yield*/, utils_1.templateFilesRelyConfirm()];
                case 12:
                    confirmed = (_g.sent()).confirmed;
                    if (!confirmed) {
                        console.log(chalk_1.default.red('更新操作已终止'));
                        process.exit(0);
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 14];
                case 13:
                    spinner.succeed(chalk_1.default.grey('rapper: 未发现不合法依赖'));
                    _g.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    spinner.succeed(chalk_1.default.grey('rapper: 未发现不合法依赖'));
                    _g.label = 16;
                case 16:
                    spinner.start(chalk_1.default.grey('rapper: 正在生成模板代码...'));
                    Creator = {};
                    switch (type) {
                        case 'redux':
                            Creator = redux_1.default;
                            break;
                        default:
                            Creator = {};
                    }
                    indexCodeArr = [base_creator_1.createBaseIndexCode()];
                    if (Creator.createIndexStr) {
                        indexCodeArr.push(Creator.createIndexStr());
                    }
                    indexStr = "\n    " + tools_1.creatHeadHelpStr(rapUrl, projectId, rapperVersion) + "\n    " + utils_1.mixGeneratedCode(indexCodeArr) + "\n  ";
                    outputFiles.push({
                        path: rapperPath + "/index.ts",
                        content: formatter_1.format(indexStr, json_schema_to_typescript_1.DEFAULT_OPTIONS),
                    });
                    requestStr = '';
                    if (!Creator.createBaseRequestStr) return [3 /*break*/, 18];
                    return [4 /*yield*/, Creator.createBaseRequestStr(interfaces, {
                            rapUrl: rapUrl,
                            resSelector: resSelector,
                        })];
                case 17:
                    requestStr = _g.sent();
                    return [3 /*break*/, 20];
                case 18: return [4 /*yield*/, base_creator_1.createBaseRequestStr(interfaces, {
                        rapUrl: rapUrl,
                        resSelector: resSelector,
                    })];
                case 19:
                    requestStr = _g.sent();
                    _g.label = 20;
                case 20:
                    requestStr = "\n    " + tools_1.creatHeadHelpStr(rapUrl, projectId, rapperVersion) + "\n    " + requestStr + "\n  ";
                    outputFiles.push({
                        path: rapperPath + "/request.ts",
                        content: formatter_1.format(requestStr, json_schema_to_typescript_1.DEFAULT_OPTIONS),
                    });
                    /** 生成 ${type}.ts 动态的 */
                    Creator.createDynamicStr &&
                        outputFiles.push({
                            path: rapperPath + "/" + type + ".ts",
                            content: formatter_1.format("\n          " + tools_1.creatHeadHelpStr(rapUrl, projectId, rapperVersion) + "\n          " + Creator.createDynamicStr(interfaces, { rapUrl: rapUrl, resSelector: resSelector }) + "\n        ", json_schema_to_typescript_1.DEFAULT_OPTIONS),
                        });
                    /** 生成的模板文件第一行增加MD5 */
                    outputFiles = outputFiles.map(function (item) { return (__assign(__assign({}, item), { content: "/* md5: " + utils_1.getMd5(item.content) + " */\n" + item.content })); });
                    return [2 /*return*/, Promise.all(outputFiles.map(function (_a) {
                            var path = _a.path, content = _a.content;
                            return utils_1.writeFile(path, content);
                        }))
                            .then(function () {
                            spinner.succeed(chalk_1.default.green("rapper: \u6210\u529F\uFF01\u5171\u540C\u6B65\u4E86 " + interfaces.length + " \u4E2A\u63A5\u53E3"));
                        })
                            .catch(function (err) {
                            spinner.fail(chalk_1.default.red("rapper: \u5931\u8D25\uFF01" + err.message));
                        })];
            }
        });
    });
}
exports.default = default_1;
