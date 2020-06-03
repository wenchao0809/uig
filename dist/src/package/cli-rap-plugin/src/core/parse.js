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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.generateJsCode = exports.generateCode = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var prettier_1 = __importDefault(require("prettier"));
var typeDefinedMap = {};
var cacheTypes = [];
var currentAllRspProperties;
var currentAllDataProperties;
function generateApiTypeCode(modules) {
    var modulesStr = '';
    for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
        var module_1 = modules_1[_i];
        modulesStr += module_1.name + ": {" + generateInterfaceTypeCode(module_1.interfaces) + "};";
    }
    return "\n     interface Api {\n         " + modulesStr + "\n     }\n    ";
}
function generateInterfaceTypeCode(interfaces) {
    var intfStr = '';
    for (var _i = 0, interfaces_1 = interfaces; _i < interfaces_1.length; _i++) {
        var intf = interfaces_1[_i];
        var funType = parseIntfFunctionType(intf.properties);
        /** */
        intfStr = "/**" + intf.description + " */\n" + intf.name + ": ( data: { " + generateInlineTypes(funType.data) + " } ) => Promise<{" + generateInlineTypes(funType.res) + "}>;";
    }
    return intfStr;
}
function parseIntfFunctionType(properties) {
    var data = [];
    var res = [];
    for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
        var property = properties_1[_i];
        property.type = property.type.toLowerCase();
        property.scope === 'response' ? res.push(property) : data.push(property);
    }
    return {
        data: data,
        res: res
    };
}
function generateInlineTypes(properties) {
    var type = '';
    var _loop_1 = function (i) {
        var property = properties[i];
        var addStr = void 0;
        if (property.type === 'Object' || property.type === 'Array') {
            // 对象或者数组
            var child = properties.filter(function (item, index) {
                if (item.parentId === property.id) {
                    properties.splice(index, 1);
                    return true;
                }
            });
            addStr = property.type === 'Object' ? property.name + ": { " + generateInlineTypes(child) + " };" : property.name + ": { " + generateInlineTypes(child) + " }[];";
        }
        else {
            var name_1 = property.required ? "" + property.name : property.name + "?";
            addStr = name_1 + ": " + property.type.toLowerCase() + ";";
        }
        type += addStr;
    };
    for (var i = 0; i < properties.length; i++) {
        _loop_1(i);
    }
    return type;
}
function generateApiCode(modules) {
    var str = '';
    for (var _i = 0, modules_2 = modules; _i < modules_2.length; _i++) {
        var module_2 = modules_2[_i];
        str += module_2.name + ": {\n" + generateInterfaceCode(module_2.interfaces) + "},";
    }
    return "{ " + str + "}\n        ";
}
function generateInterfaceCode(interfaces) {
    var str = '';
    for (var _i = 0, interfaces_2 = interfaces; _i < interfaces_2.length; _i++) {
        var intf = interfaces_2[_i];
        str += intf.name + "(data) {\n\n            return axios." + intf.method.toLowerCase() + "('" + intf.url + "', data)\n            \n\n        }";
    }
    return str;
}
function generateCode(json) {
    var modules = json.modules;
    return "\n    " + generateApiTypeCode(modules) + "\n\n    let api: Api\n\n    api = " + generateApiCode(modules) + "\n    export default api\n    ";
}
exports.generateCode = generateCode;
function generateComment(intf) {
    var intfProperties = parseIntfFunctionType(intf.properties);
    currentAllDataProperties = intfProperties.data;
    currentAllRspProperties = intfProperties.res;
    generateJsDocTypeDef(intf.name + "Rsp", intfProperties.res);
    return "\n/**\n * " + intf.description + "\n * @param {object} data\n " + generatePropertyComment(intfProperties.data, '@param', 'data') + "\n * @returns {Promise<" + intf.name + "Rsp>}\n */\n";
}
/**
 *
 * @param properties
 * @param nsp 命名空间
 * @param tag jsdoc tag
 */
function generatePropertyComment(properties, tag, nsp) {
    var commentStr = '';
    var _loop_2 = function (i) {
        var addStr = '';
        var property = properties[i];
        if (!property.id)
            return "continue";
        if (property.type === 'object' || property.type === 'array') {
            var allProperties_1 = property.scope === 'response' ? currentAllRspProperties : currentAllDataProperties;
            var child = allProperties_1.filter(function (item, index) {
                if (item.parentId === property.id) {
                    allProperties_1.splice(index, 1, {});
                    return true;
                }
            });
            if (property.type === 'object') {
                addStr = "\n * " + tag + " {" + property.type + "} " + (nsp ? nsp + "." : '') + property.name + " - " + property.description + generatePropertyComment(child, tag, "" + (nsp ? nsp + "." : '') + property.name);
            }
            else {
                generateJsDocTypeDef(property.name + "Type", child);
                addStr = "\n * " + tag + " {" + property.name + "Type[]}  " + (nsp ? nsp + "." : '') + property.name + " - " + property.description;
            }
        }
        else {
            addStr = "\n * " + tag + " {" + property.type + "} " + (nsp ? nsp + "." : '') + property.name + " - " + property.description;
        }
        commentStr += addStr;
    };
    for (var i = 0; i < properties.length; i++) {
        _loop_2(i);
    }
    return commentStr;
}
function generateJsDocTypeDef(typeName, properties) {
    if (typeDefinedMap[typeName])
        return;
    typeDefinedMap[typeName] = true;
    var propertiesStr = generatePropertyComment(properties, '@property');
    var typedef = "\n/**\n * @typedef " + typeName + propertiesStr + "\n */\n";
    cacheTypes.push(typedef);
}
function mergeJsDocTypeDef() {
    return cacheTypes.reduce(function (p, n) { return p + n; }, '');
}
function generateInterfaceCodeJs(interfaces) {
    var funcDefine = interfaces.reduce(function (p, n) {
        return p += generateComment(n) + " export function " + generateInterfaceCode([n]);
    }, '');
    var typeDefine = mergeJsDocTypeDef();
    return typeDefine + funcDefine;
}
function generateJsCode(json) {
    var modules = json.modules;
    var moduleCodes = modules.map(function (module) {
        // 每个模块重置types
        typeDefinedMap = {};
        cacheTypes = [];
        return {
            filePath: path.resolve(__dirname, '../../../../../src', 'api', module.name + ".js"),
            content: generateInterfaceCodeJs(module.interfaces)
        };
    });
    writeFile(moduleCodes);
}
exports.generateJsCode = generateJsCode;
function writeFile(modules) {
    for (var _i = 0, modules_3 = modules; _i < modules_3.length; _i++) {
        var item = modules_3[_i];
        fs.writeFileSync(item.filePath, prettier_1.default.format(item.content, {
            semi: true,
            trailingComma: 'all',
            singleQuote: true,
            printWidth: 100,
            tabWidth: 2
        }));
    }
}
exports.writeFile = writeFile;
