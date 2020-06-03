import { Module, Interface, Intf  } from '../types'
import * as fs from 'fs'
import * as path from 'path'
import prettier from 'prettier'
let typeDefinedMap: any = {}
let cacheTypes: string[] = []
let currentAllRspProperties: Array<Interface.IProperty>
let currentAllDataProperties: Array<Interface.IProperty>

function generateApiTypeCode(modules: Array<Module>): string {
  let modulesStr = ''
  for (const module of modules) {
    modulesStr += `${module.name}: {${generateInterfaceTypeCode(module.interfaces)}};`
  }
  return `
     interface Api {
         ${modulesStr}
     }
    ` 
}

type InterfaceFuncitonType = {
    data: Array<Interface.IProperty>;
    res: Array<Interface.IProperty>
}
function generateInterfaceTypeCode (interfaces: Array<Interface.IRoot>) {
  let intfStr = ''
  for (const intf of interfaces) {
    const funType = parseIntfFunctionType(intf.properties)
    /** */
    intfStr = `/**${intf.description} */\n${intf.name}: ( data: { ${generateInlineTypes(funType.data)} } ) => Promise<{${generateInlineTypes(funType.res) }}>;`
  }
  return intfStr
}
function parseIntfFunctionType(properties: Array<Interface.IProperty>) : InterfaceFuncitonType {
  const data: Array<Interface.IProperty> = []
  const res: Array<Interface.IProperty> = []
  for (const property of properties) {
    property.type = property.type.toLowerCase()
    property.scope === 'response' ? res.push(property) : data.push(property)
  }
  return {
    data,
    res
  }
}
function generateInlineTypes(properties: Array<Interface.IProperty>) {
  let type = ''
  for (let i = 0; i < properties.length; i++) {
    const property = properties [i]
    let addStr: string
    if (property.type === 'Object' || property.type === 'Array') {
      // 对象或者数组
      const child = properties.filter((item, index) => {
        if (item.parentId === property.id) {
          properties.splice(index, 1)
          return true
        }
      })
      addStr = property.type === 'Object' ? `${property.name}: { ${generateInlineTypes(child)} };` : `${property.name}: { ${generateInlineTypes(child)} }[];`
    } else {
      const name = property.required ? `${property.name}` : `${property.name}?`
      addStr = `${name}: ${property.type.toLowerCase()};`
    }
    type += addStr
  }
  return type
}

function generateApiCode(modules: Array<Module>) {
  let str = ''
  for (const module of modules) {
    str += `${module.name}: {\n${generateInterfaceCode(module.interfaces)}},`
  }
  return `{ ${str}}
        `
}

function generateInterfaceCode(interfaces: Array<Intf>) {
  let str = ''
  for (const intf of interfaces) {
    str += `${intf.name}(data) {\n
            return axios.${intf.method.toLowerCase()}('${intf.url}', data)
            \n
        }`
  }
  return str
}
export function generateCode(json: any):string {
  const modules: Array<Module> = json.modules
  return `
    ${generateApiTypeCode(modules)}\n
    let api: Api\n
    api = ${generateApiCode(modules)}
    export default api
    `
}
function generateComment(intf: Intf) {
  const intfProperties = parseIntfFunctionType(intf.properties)
  currentAllDataProperties = intfProperties.data
  currentAllRspProperties = intfProperties.res
  generateJsDocTypeDef(`${intf.name}Rsp`, intfProperties.res)
  return `
/**
 * ${intf.description}
 * @param {object} data
 ${generatePropertyComment(intfProperties.data, '@param', 'data')}
 * @returns {Promise<${intf.name}Rsp>}
 */
`
}
/**
 * 
 * @param properties 
 * @param nsp 命名空间
 * @param tag jsdoc tag
 */
function generatePropertyComment(properties: Array<Interface.IProperty>, tag: string, nsp?: string, ) {
  let commentStr = ''
  for(let i = 0; i < properties.length; i++) {
    let addStr = ''
    const property = properties[i]
    if (!property.id) continue
    if (property.type === 'object' || property.type === 'array' ) {
      const allProperties = property.scope === 'response' ? currentAllRspProperties : currentAllDataProperties 
      const child = allProperties.filter((item, index) => {
        if (item.parentId === property.id) {
          allProperties.splice(index, 1, {} as Interface.IProperty)
          return true
        }
      })
      if (property.type === 'object') {
        addStr = `\n * ${tag} {${property.type}} ${nsp ? `${nsp}.` : ''}${property.name} - ${property.description}${generatePropertyComment(child, tag, `${nsp ? `${nsp}.` : ''}${property.name}`)}`
      } else {
        generateJsDocTypeDef(`${property.name}Type`, child)
        addStr = `\n * ${tag} {${property.name}Type[]}  ${nsp ? `${nsp}.` : ''}${property.name} - ${property.description}`
      }
    } else {
      addStr = `\n * ${tag} {${property.type}} ${nsp ? `${nsp}.` : ''}${property.name} - ${property.description}` 
    }
    commentStr += addStr
  }
  return commentStr
}
function generateJsDocTypeDef(typeName:string, properties: Array<Interface.IProperty>) {
  if (typeDefinedMap[typeName]) return
  typeDefinedMap[typeName] = true
  const propertiesStr = generatePropertyComment(properties, '@property')  
  const typedef = `
/**
 * @typedef ${typeName}${propertiesStr}
 */
`
  cacheTypes.push(typedef)
}

function mergeJsDocTypeDef() {
  return cacheTypes.reduce((p, n) => p+n, '')
}
function generateInterfaceCodeJs(interfaces: Array<Intf>) {
  const funcDefine = interfaces.reduce((p, n) => {
    return p += `${generateComment(n)} export function ${generateInterfaceCode([n])}`
  }, '')
  const typeDefine = mergeJsDocTypeDef()
  return typeDefine + funcDefine
}
export function generateJsCode(json: any) {
  const modules: Array<Module> = json.modules
  const moduleCodes: Array<CodeContent> = modules.map((module) => {
    // 每个模块重置types
    typeDefinedMap = {}
    cacheTypes = []
    return {
      filePath: path.resolve(__dirname, '../../../../../src', 'api', `${module.name}.js`),
      content: generateInterfaceCodeJs(module.interfaces)
    }
  })
  writeFile(moduleCodes)
}

type CodeContent = {
    content: string,
    filePath: string
}
export function writeFile(modules: Array<CodeContent>) {
  for (const item of modules) {
    fs.writeFileSync(item.filePath, prettier.format(item.content, {
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2
      }))
  }
}


