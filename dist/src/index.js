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
Object.defineProperty(exports, "__esModule", { value: true });
var prettier = require("prettier");
console.log(prettier.format('var a = 1;  '));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var parse_1 = require("./package/cli-rap-plugin/src/core/parse");
var data = fs.readFileSync(path.resolve(__dirname, '../../src', 'data.json'));
data = JSON.parse(data.toString());
fs.writeFileSync(path.resolve(__dirname, '../../src', 'api', 'index.ts'), prettier.format(parse_1.generateCode(data.data), {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
}));
parse_1.generateJsCode(data.data);
