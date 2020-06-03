"use strict";
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
exports.getPackageName = exports.templateFilesRelyConfirm = exports.templateFilesOverwriteConfirm = exports.getOldProjectId = exports.getMd5 = exports.isInRoot = exports.moveFile = exports.writeFile = exports.mixGeneratedCode = exports.relativeImport = exports.withoutExt = void 0;
var path = __importStar(require("path"));
var mkdirp = __importStar(require("mkdirp"));
var fs = __importStar(require("fs"));
var crypto = __importStar(require("crypto"));
var inquirer = __importStar(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var packageJson = require('../package.json');
function withoutExt(p) {
    return p.replace(/\.[^/.]+$/, '');
}
exports.withoutExt = withoutExt;
function relativeImport(from, to) {
    return withoutExt('./' + path.relative(path.dirname(from), to));
}
exports.relativeImport = relativeImport;
function mixGeneratedCode(codeArr) {
    var imports = codeArr.map(function (c) { return c.import; });
    var bodies = codeArr.map(function (c) { return c.body; });
    var _exports = codeArr.map(function (c) { return c.export; });
    return "\n    " + imports.join('\n') + "\n    " + bodies.join('\n') + "\n    " + _exports.join('\n') + "\n  ";
}
exports.mixGeneratedCode = mixGeneratedCode;
function writeFile(filepath, contents) {
    return new Promise(function (resolve, reject) {
        mkdirp(path.dirname(filepath), function (err) {
            if (err)
                return reject("filepath: " + filepath + ", " + err);
            fs.writeFile(filepath, contents, function (err) {
                if (err)
                    return reject("filepath: " + filepath + ", " + err);
                resolve();
            });
        });
    });
}
exports.writeFile = writeFile;
function moveFile(from, to) {
    return new Promise(function (resolve, reject) {
        mkdirp(path.dirname(to), function (err) {
            if (err)
                return reject("\u8BFB\u53D6\u6587\u4EF6\u5931\u8D25: " + from + ", " + err);
            var contents = fs.readFileSync(from);
            fs.writeFile(to, contents, function (err) {
                if (err)
                    return reject("\u5199\u5165\u6587\u4EF6\u5931\u8D25: " + to + ", " + err);
                resolve();
            });
        });
    });
}
exports.moveFile = moveFile;
/**
 * 命令是否在根目录执行
 */
function isInRoot() {
    var cwd = process.cwd();
    var flag = fs.existsSync(path.resolve(cwd, 'package.json'));
    return flag;
}
exports.isInRoot = isInRoot;
/** 获取文件md5 */
function getMd5(fileContent) {
    var hash = crypto.createHash('md5');
    hash.update(fileContent);
    return hash.digest('hex');
}
exports.getMd5 = getMd5;
function getOldProjectId(rappperPath) {
    var indexPath = path.resolve(process.cwd(), rappperPath, './index.ts');
    try {
        var content = fs.readFileSync(indexPath, 'UTF-8') || '';
        var projectIdStr = content.split('\n')[1] || '';
        var matchArr = projectIdStr.match(/\/\*\sRap仓库id:\s(\S*)\s\*\//) || [];
        return matchArr[1];
    }
    catch (err) {
        return undefined;
    }
}
exports.getOldProjectId = getOldProjectId;
/** 模板文件覆盖确认 */
function templateFilesOverwriteConfirm() {
    return __awaiter(this, void 0, void 0, function () {
        var question, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    question = [
                        {
                            name: 'confirmed',
                            type: 'confirm',
                            message: chalk_1.default.green('检测到您修改了 rapper 生成的模板代码，新生成的模板代码将覆盖您的修改，确定要继续么？'),
                            default: false,
                        },
                    ];
                    return [4 /*yield*/, inquirer.prompt(question)];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, answers];
            }
        });
    });
}
exports.templateFilesOverwriteConfirm = templateFilesOverwriteConfirm;
/** 存在接口依赖被删确认 */
function templateFilesRelyConfirm() {
    return __awaiter(this, void 0, void 0, function () {
        var question, answers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    question = [
                        {
                            name: 'confirmed',
                            type: 'confirm',
                            message: chalk_1.default.green('确定要继续同步接口到本地吗? (会存在页面中调用的接口不存在的风险)？'),
                            default: false,
                        },
                    ];
                    return [4 /*yield*/, inquirer.prompt(question)];
                case 1:
                    answers = _a.sent();
                    return [2 /*return*/, answers];
            }
        });
    });
}
exports.templateFilesRelyConfirm = templateFilesRelyConfirm;
/** 获取当前包名 */
function getPackageName() {
    return packageJson.name;
}
exports.getPackageName = getPackageName;
