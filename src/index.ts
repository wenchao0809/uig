import prettier = require("prettier")
console.log(prettier.format('var a = 1;  '))
import * as fs from 'fs'
import * as path from 'path'
import { generateCode, generateJsCode } from './package/cli-rap-plugin/src/core/parse'
import { writeFile } from "./package/cli-rap-plugin/src/utils"

let data = fs.readFileSync(path.resolve(__dirname, '../../src', 'data.json'))
data = JSON.parse(data.toString())
fs.writeFileSync(path.resolve(__dirname, '../../src', 'api', 'index.ts'), prettier.format(generateCode(data.data),  {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
}))
generateJsCode(data.data)